import { PropsWithChildren } from "react";

export function Tool(
  props: PropsWithChildren<{
    title?: string;
    description?: string;
    className?: string;
  }>
) {
  return (
    <div className={props.className ?? ""}>
      {props.title && <h2 className="">{props.title}</h2>}
      {props.description && (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {props.description}
        </p>
      )}
      {props.children}
    </div>
  );
}
