import { parse, stringify, validate } from "uuid";
import "./App.css";
import InputBox from "./components/InputBox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isEmpty, isNil, isString } from "lodash-es";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  uuidToBigInt,
  uuidToBits,
} from "./lib/encoding";
import { Tool } from "./tools/Tool";
import { CopyToClipboard } from "./components/CopyToClipboard";
import { GeneratorContextProvider } from "./context/generatorContext";

function App() {
  const [sourceValue, setSourceValue] = useState("");

  const [decoded, setDecoded] = useState<{
    valid: boolean;
    content?: string | undefined;
  }>({ valid: true, content: "" });

  const [encoded, setEncoded] = useState<{
    valid: boolean;
    content?: string | undefined;
  }>({ valid: true, content: "" });

  const [uuidBits, setUuidBits] = useState<{
    valid: boolean;
    content?: string | undefined;
  }>({
    valid: true,
    content: "",
  });

  const [uuidBigInt, setUuidBigInt] = useState<{
    valid: boolean;
    content?: bigint | undefined;
  }>({
    valid: true,
    content: undefined,
  });

  const [toolsPanelClassName, setToolsPanelClassName] = useState("opacity-0");

  const onValueChanged = useCallback((value: string) => {
    setSourceValue(value);
  }, []);

  const sourceIsUUID = useMemo(() => validate(sourceValue), [sourceValue]);
  const sourceIsEncodedUUID = useMemo(
    () => decoded.valid && !isEmpty(decoded.content),
    [decoded]
  );

  const isSourceEmpty = useMemo(() => {
    return isEmpty(sourceValue);
  }, [sourceValue]);

  const isSourceValid = useMemo(
    () => isSourceEmpty || sourceIsUUID || sourceIsEncodedUUID,
    [isSourceEmpty, sourceIsUUID, sourceIsEncodedUUID]
  );

  useEffect(() => {
    if (sourceIsUUID) {
      setDecoded({ valid: true, content: sourceValue });
    } else if (isString(sourceValue) && !isEmpty(sourceValue)) {
      try {
        const bytes = base64ToArrayBuffer(sourceValue);
        setDecoded({ valid: true, content: stringify(bytes) });
      } catch {
        setDecoded({ valid: false });
      }
    } else {
      setDecoded({ valid: true, content: undefined });
    }
  }, [sourceIsUUID, sourceValue]);

  useEffect(() => {
    if (sourceIsUUID && isString(sourceValue) && !isEmpty(sourceValue)) {
      setEncoded({
        valid: true,
        content: arrayBufferToBase64(parse(sourceValue)),
      });
    } else {
      setEncoded({ valid: true, content: sourceValue });
    }
  }, [sourceIsUUID, sourceValue]);

  useEffect(() => {
    if (decoded.valid && decoded.content) {
      setUuidBits({ valid: true, content: uuidToBits(decoded.content) });
      setUuidBigInt({
        valid: true,
        content: uuidToBigInt(decoded.content),
      });
    } else {
      setUuidBits({ valid: true, content: "" });
      setUuidBigInt({ valid: true, content: undefined });
    }
  }, [decoded.valid, decoded.content]);

  useEffect(() => {
    if (isSourceValid && !isSourceEmpty) {
      setToolsPanelClassName("opacity-100");
    } else {
      setToolsPanelClassName("opacity-0");
    }
  }, [isSourceValid, isSourceEmpty]);

  return (
    <GeneratorContextProvider>
      <main className="font-sans h-screen dark:bg-gray-900 dark:text-gray-50 overflow-y-auto">
        <div className="container mx-auto p-4 max-w-4xl h-full min-h-screen flex flex-col align-middle justify-center items-center">
          <InputBox
            placeholder="Enter a UUID or a base64 encoding of a UUID bytes"
            className={isSourceValid ? "" : "border-red-500"}
            onValueChanged={onValueChanged}
          ></InputBox>

          {isSourceValid && !isSourceEmpty && (
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-10 transition-opacity duration-500 ease-in opacity-0 animate-fade-in ${toolsPanelClassName}`}
            >
              {decoded.valid && decoded.content && (
                <Tool description="Decoded from a base64 representation of its bytes">
                  <CopyToClipboard
                    className="font-mono text-xl"
                    text={decoded.content ?? ""}
                    enabled={!isNil(decoded.content)}
                  ></CopyToClipboard>
                </Tool>
              )}
              {encoded.valid && encoded.content && (
                <Tool description="Base64 representation of the UUID bytes">
                  <CopyToClipboard
                    className="font-mono text-xl"
                    text={encoded.content ?? ""}
                    enabled={!isNil(encoded.content)}
                  ></CopyToClipboard>
                </Tool>
              )}

              <Tool description="Bit representation">
                <CopyToClipboard
                  className="font-mono text-xl wrap-anywhere"
                  text={uuidBits.content ?? ""}
                  enabled={!isNil(uuidBits)}
                ></CopyToClipboard>
              </Tool>

              <Tool description="Integer representation (128 bit)">
                <CopyToClipboard
                  className="font-mono text-xl wrap-anywhere"
                  text={uuidBigInt.content?.toString() ?? ""}
                  enabled={!isNil(uuidBigInt)}
                ></CopyToClipboard>
              </Tool>
            </div>
          )}
        </div>
      </main>
    </GeneratorContextProvider>
  );
}

export default App;
