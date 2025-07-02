import { noop } from "lodash-es";
import React, { MouseEventHandler, ReactNode } from "react";

export interface Props {
  className: string;
  onClick: MouseEventHandler;
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  name?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, Partial<Props>>(
  ({ onClick, className, type, children, name }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center h-9 w-24 rounded border border-input bg-transparent px-3 py-1 text-center shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-sm ${className}`}
        onClick={onClick ?? noop}
        type={type}
        name={name ?? "button"}
        aria-label={name ?? "button"}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
