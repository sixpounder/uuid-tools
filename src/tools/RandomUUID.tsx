import { v4 } from "uuid";
import { Tool } from "./Tool";
import { useState } from "react";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { isNil } from "lodash-es";

export function RandomUUID() {
  const [generated, setGenerated] = useState<string | null>(null);

  function generate() {
    setGenerated(v4());
  }

  return (
    <Tool
      title="UUID Generator"
      description="Generates random UUID using the 'uuid' library"
    >
      <div className="mt-4 flex flex-row space-x-4 justify-start items-center">
        <button
          className="h-9 w-24 rounded border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-sm"
          onClick={() => generate()}
        >
          Generate
        </button>
        <div className="generate-result">
          {!isNil(generated) && (
            <CopyToClipboard
              className="font-mono"
              text={generated ?? ""}
              enabled={!isNil(generated)}
            ></CopyToClipboard>
          )}
        </div>
      </div>
    </Tool>
  );
}
