import { createContext } from "react";
import { ContextType } from "./usePopover";

export const PopoverContext = createContext<ContextType>(null);
