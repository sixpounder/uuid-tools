import { createContext, ReactNode, useState } from "react";
import { UUIDVersion } from "../lib/provider";
import { v1, v4, v6, v7 } from "uuid";

const versions: UUIDVersion[] = [
  {
    name: "v1",
    description: "Time-based UUID",
    provider: v1,
  },
  {
    name: "v4",
    description: "Randomly generated UUID",
    provider: v4,
  },
  {
    name: "v6",
    description: "Reordered time-based UUID for improved sorting",
    provider: v6,
  },
  {
    name: "v7",
    description: "Time-ordered UUID based on Unix epoch time",
    provider: v7,
  },
];

interface GeneratorContextType {
  versions: UUIDVersion[];
  selected: UUIDVersion;
  setSelected: React.Dispatch<React.SetStateAction<UUIDVersion>>;
}

export const GeneratorContext = createContext<GeneratorContextType>({
  selected: versions[1],
  setSelected: () => {},
  versions,
});

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
