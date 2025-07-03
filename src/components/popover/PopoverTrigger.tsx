import { useMergeRefs } from "@floating-ui/react";
import { forwardRef, isValidElement, cloneElement } from "react";
import { usePopoverContext } from "./usePopoverContext";

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & PopoverTriggerProps
>(function PopoverTrigger({ children, asChild = false, ...props }, propRef) {
  const context = usePopoverContext();

  // Extract ref from child props if present (React 19+)
  const childrenRef = isValidElement(children) ? children.props.ref : null;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return (
    <div
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      role="button"
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});
