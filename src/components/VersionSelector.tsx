import { useContext, useEffect, useState } from "react";
import { UUIDVersion } from "../lib/provider";
import { FaCheck } from "react-icons/fa";
import { GeneratorContext } from "../context/generatorContext";

interface Props {
  onSelected: (version: UUIDVersion) => void;
}

export const VersionSelector = ({ onSelected }: Props) => {
  const generatorContext = useContext(GeneratorContext);
  const [selected, setSelected] = useState<UUIDVersion>(
    generatorContext.selected
  );

  useEffect(() => {
    onSelected?.(selected);
  }, [onSelected, selected]);

  return (
    <ul className="w-64 text-sm font-medium shadow text-gray-900 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {generatorContext.versions.map((v) => (
        <li
          key={v.name}
          className={`w-full flex flex-row justify-start align-top px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
            v === selected ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          onClick={() => setSelected(v)}
        >
          <div className="w-16 self-center justify-self-center inline-flex justify-center mr-4 text-lg">
            {v === selected && <FaCheck></FaCheck>}
          </div>
          <div className="w-48 inline-flex flex-col gap-2">
            <span>{v.name}</span>
            <small className="text-xs">{v.description}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};
