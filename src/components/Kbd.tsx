import { ReactNode } from "react";

export default function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 border rounded-lg bg-gray-100 border-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500">
      {children}
    </kbd>
  );
}
