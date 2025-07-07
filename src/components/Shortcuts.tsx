import Kbd from "./Kbd";

export default function Shortcuts() {
    return (
        <div id="shortcuts" className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center">
                <Kbd>r</Kbd>
                <span className="opacity-65 ml-1 font-mono text-xs">Generate</span>
            </div>
            <div className="flex flex-row items-center">
                <Kbd>&#x21E1;</Kbd>
                <span className="opacity-65 ml-1 font-mono text-xs">Prev. version</span>
            </div>
            <div className="flex flex-row items-center">
                <Kbd>&#x21E3;</Kbd>
                <span className="opacity-65 ml-1 font-mono text-xs">Next version</span>
            </div>
        </div>
    );
}
