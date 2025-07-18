import Kbd from "./Kbd";

export default function Shortcuts() {
  return (
    <div id="shortcuts" className="flex flex-row items-center gap-3">
      <div className="flex flex-row items-center">
        <Kbd>r</Kbd>
        <span className="ml-1 font-mono text-xs">Generate</span>
      </div>
      <div className="flex flex-row items-center">
        <Kbd>&#x21E1; &#x21E3;</Kbd>
        <span className="ml-1 font-mono text-xs">Switch UUID version</span>
      </div>
    </div>
  );
}
