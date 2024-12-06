import { PropsWithChildren } from "react";

export function Tool(
  props: PropsWithChildren<{
    title: string;
    description?: string;
    className?: string;
  }>
) {
  return (
    <div id="tool-encoder" className={props.className ?? ""}>
      <h2 className="text-2xl">{props.title}</h2>
      {props.description && (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {props.description}
        </p>
      )}
      {props.children}
    </div>
  );
}
