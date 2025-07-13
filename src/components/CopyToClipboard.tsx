import { PropsWithoutRef, useState } from "react";
import { FiCopy } from "react-icons/fi";
import "./CopyToClipboard.css";
import { useDelay } from "../hooks/useDelay";

export function CopyToClipboard(
  props: PropsWithoutRef<{
    text: string;
    title?: string;
    enabled: boolean;
    className?: string;
  }>
) {
  const [notification, setNotification] = useState(false);

  function copy() {
    if (props.enabled) {
      navigator.clipboard.writeText(props.text);
      notify();
    }
  }

  const notify = useDelay(() => setNotification(false), () => setNotification(true), 850);

  function classBindings() {
    return `ctc-wrapper relative p-2 cursor-pointer rounded dark:hover:bg-gray-500 hover:bg-gray-200 flex flex-row justify-between items-center`;
  }

  return (
    <div className={classBindings()} onClick={copy}>
      <span
        className={props.className}
        title={props.title ?? "Copy to clipboard"}
      >
        {props.text}
      </span>
      <span className="ctc-icon ml-2">
        <FiCopy></FiCopy>
      </span>
      {notification && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 m-auto w-20 h-7 text-center text-sm rounded bg-fuchsia-700 text-gray-200 shadow-current">
          <span>Copied</span>
        </div>
      )}
    </div>
  );
}
