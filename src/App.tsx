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
import { GeneratorContextProvider } from "./context/GeneratorContextProvider";
import Shortcuts from "./components/Shortcuts";
import Credits from "./components/Credits";

function App() {
  const [sourceValue, setSourceValue] = useState("");

  const [toolsPanelClassName, setToolsPanelClassName] = useState("opacity-0");

  const onValueChanged = useCallback((value: string) => {
    setSourceValue(value);
  }, []);

  const sourceIsUUID = useMemo(() => validate(sourceValue), [sourceValue]);

  const decoded = useMemo(() => {
    if (sourceIsUUID) {
      return { valid: true, content: sourceValue };
    } else if (isString(sourceValue) && !isEmpty(sourceValue)) {
      try {
        const bytes = base64ToArrayBuffer(sourceValue);
        return { valid: true, content: stringify(bytes) };
      } catch {
        return { valid: false };
      }
    } else {
      return { valid: true, content: undefined };
    }
  }, [sourceIsUUID, sourceValue]);

  const sourceIsEncodedUUID = useMemo(
    () => decoded.valid && !isEmpty(decoded.content),
    [decoded],
  );

  const isSourceEmpty = useMemo(() => {
    return isEmpty(sourceValue);
  }, [sourceValue]);

  const isSourceValid = useMemo(
    () => isSourceEmpty || sourceIsUUID || sourceIsEncodedUUID,
    [isSourceEmpty, sourceIsUUID, sourceIsEncodedUUID],
  );

  const encoded = useMemo(() => {
    if (sourceIsUUID && isString(sourceValue) && !isEmpty(sourceValue)) {
      return {
        valid: true,
        content: arrayBufferToBase64(parse(sourceValue)),
      };
    } else {
      return { valid: true, content: sourceValue };
    }
  }, [sourceIsUUID, sourceValue]);

  const uuidBits = useMemo(() => {
    if (decoded.valid && decoded.content) {
      return { valid: true, content: uuidToBits(decoded.content) };
    } else {
      return { valid: true, content: "" };
    }
  }, [decoded.valid, decoded.content]);

  const uuidBigInt = useMemo(() => {
    if (decoded.valid && decoded.content) {
      return { valid: true, content: uuidToBigInt(decoded.content) };
    } else {
      return { valid: true, content: undefined };
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
      <main className="font-sans min-h-screen flex items-center dark:bg-gray-900 dark:text-gray-50 overflow-y-auto">
        <div className="container overflow-y-auto mx-auto max-w-4xl h-full flex flex-col align-middle justify-center items-center p-4 pb-20">
          <InputBox
            placeholder="Enter a UUID or a base64 encoding of a UUID bytes"
            className={isSourceValid ? "" : "border-red-500"}
            onValueChanged={onValueChanged}
          >
          </InputBox>

          {isSourceValid && !isSourceEmpty && (
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-10 transition-opacity duration-500 ease-in opacity-0 animate-fade-in ${toolsPanelClassName}`}
            >
              {decoded.valid && decoded.content && (
                <Tool description="Plain UUID">
                  <CopyToClipboard
                    className="font-mono text-xl"
                    text={decoded.content ?? ""}
                    enabled={!isNil(decoded.content)}
                  >
                  </CopyToClipboard>
                </Tool>
              )}
              {encoded.valid && encoded.content && (
                <Tool description="Base64 representation of the UUID bytes">
                  <CopyToClipboard
                    className="font-mono text-xl"
                    text={encoded.content ?? ""}
                    enabled={!isNil(encoded.content)}
                  >
                  </CopyToClipboard>
                </Tool>
              )}

              <Tool description="Bit representation">
                <CopyToClipboard
                  className="font-mono text-xl wrap-anywhere"
                  text={uuidBits.content ?? ""}
                  enabled={!isNil(uuidBits)}
                >
                </CopyToClipboard>
              </Tool>

              <Tool description="Integer representation (128 bit)">
                <CopyToClipboard
                  className="font-mono text-xl wrap-anywhere"
                  text={uuidBigInt.content?.toString() ?? ""}
                  enabled={!isNil(uuidBigInt)}
                >
                </CopyToClipboard>
              </Tool>
            </div>
          )}
        </div>
        <footer className="flex flex-col gap-2 justify-center items-center fixed bottom-0 w-full backdrop-blur-lg p-4">
          <Shortcuts></Shortcuts>
          <Credits></Credits>
        </footer>
      </main>
    </GeneratorContextProvider>
  );
}

export default App;
