import { ReactNode, useState } from "react";
import { UUIDVersion } from "../lib/provider";
import { versions, GeneratorContext } from "./generatorContext";


export const GeneratorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selected, setSelected] = useState<UUIDVersion>(versions[1]);

  return (
    <GeneratorContext.Provider value={{ selected, setSelected, versions }}>
      {children}
    </GeneratorContext.Provider>
  );
};
