import { useEffect, useState } from "react";
import { Tool } from "./Tool";
import { parse, validate } from "uuid";
import { isEmpty, isNil, isString } from "lodash-es";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { arrayBufferToBase64 } from "../lib/encoding";

export function Encoder() {
  const [uuid, setUuid] = useState<string>("");
  const [encoded, setEncoded] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(false);
    if (isString(uuid) && !isEmpty(uuid)) {
      if (validate(uuid)) {
        setEncoded(arrayBufferToBase64(parse(uuid)));
        setInvalid(false);
      } else {
        setInvalid(true);
      }
    }
  }, [uuid]);

  return (
    <Tool
      title="Encode UUID"
      description="Encode an UUID into a base64 representation of its bytes"
      className="space-y-4"
    >
      <div id="encode-form" className="space-x-2">
        <input
          type="text"
          value={uuid}
          onChange={(event) => setUuid(event.target.value)}
          className={`border border-input ${
            invalid
              ? "dark:border-red-600 border-red-400"
              : "border-gray-900 dark:border-gray-600"
          } block h-9 w-full rounded bg-transparent px-3 py-1 text-base transition-colors file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
        ></input>
      </div>
      <div className="encode-result font-mono">
        {!isNil(encoded) && (
          <CopyToClipboard
            className="p-2 cursor-pointer rounded font-mono"
            text={encoded ?? ""}
            enabled={!isNil(encoded)}
          ></CopyToClipboard>
        )}
      </div>
    </Tool>
  );
}
