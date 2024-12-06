import { useEffect, useState } from "react";
import { Tool } from "./Tool";
import { isEmpty, isNil, isString } from "lodash-es";
import { stringify } from "uuid";
import { CopyToClipboard } from "../components/CopyToClipboard";

export function Decoder() {
  const [encoded, setEncoded] = useState<string>("");
  const [decoded, setDecoded] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(false);
    if (isString(encoded) && !isEmpty(encoded)) {
      let stringified;
      try {
        const bytes = base64ToArrayBuffer(encoded);
        stringified = stringify(bytes);
        setDecoded(stringified);
      } catch {
        setInvalid(true);
      }
    }
  }, [encoded]);

  return (
    <Tool
      title="Decode UUID"
      description="Decodes an UUID from a binary base64 representation"
      className="space-y-4"
    >
      <div id="encode-form" className="space-x-2">
        <input
          type="text"
          value={encoded}
          onChange={(event) => setEncoded(event.target.value)}
          className={`border border-input ${
            invalid
              ? "dark:border-red-600 border-red-400"
              : "border-gray-900 dark:border-gray-600"
          } block h-9 w-full rounded bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
        ></input>
      </div>
      <div className="encode-result">
        {!isNil(decoded) && (
          <CopyToClipboard
            className="p-2 cursor-pointer rounded font-mono"
            text={decoded ?? ""}
            enabled={!isNil(decoded)}
          ></CopyToClipboard>
        )}
      </div>
    </Tool>
  );
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
