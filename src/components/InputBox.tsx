import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./Button";
import { FaChevronDown, FaDice } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./usePopover";
import { VersionSelector } from "./VersionSelector";
import { UUIDVersion } from "../lib/provider";
import { GeneratorContext } from "../context/generatorContext";
import { clamp } from "lodash-es";

export interface InputBoxProps {
  placeholder: string;
  onValueChanged: (value: string) => void;
  className: string;
}

const InputBox: React.FC<Partial<InputBoxProps>> = ({
  placeholder,
  onValueChanged,
  className,
}: Partial<InputBoxProps>) => {
  const nativeInput: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const [value, setValue] = useState("");

  const generatorContext = useContext(GeneratorContext);

  const handleGenerate = useCallback(() => {
    setValue(generatorContext.selected.provider());
  }, [generatorContext.selected]);

  useEffect(() => {
    if (onValueChanged) {
      onValueChanged(value);
    }
  }, [onValueChanged, value]);

  const generatorLabel = useMemo(() => {
    return generatorContext.selected.name;
  }, [generatorContext.selected]);

  const onVersionSelected = useCallback(
    (version: UUIDVersion): void => {
      generatorContext.setSelected(version);
    },
    [generatorContext],
  );

  const onShortcut = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "r") {
      handleGenerate();
    }

    if (ev.key === "ArrowDown") {
      const nextIndex = clamp(generatorContext.versions.indexOf(generatorContext.selected) + 1, 0, generatorContext.versions.length - 1);
      generatorContext.setSelected(generatorContext.versions[nextIndex]);
    }

    if (ev.key === "ArrowUp") {
      const nextIndex = clamp(generatorContext.versions.indexOf(generatorContext.selected) - 1, 0, generatorContext.versions.length - 1);
      generatorContext.setSelected(generatorContext.versions[nextIndex]);
    }
  }, [handleGenerate, generatorContext]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onShortcut);

      return () => {
        window.removeEventListener("keydown", onShortcut);
      };
    }
  }, [onShortcut]);
  return (
    <div
      className={`flex items-center justify-start rounded-full border border-input p-1.5 h-20 w-full shadow-md sm:text-lg md:text-xl lg:text-xl ${className}`}
    >
      <input
        ref={nativeInput}
        type="text"
        value={value}
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => {
          nativeInput.current?.select();
        }}
        placeholder={placeholder ?? ""}
        aria-label={placeholder ?? ""}
        className={`block h-full w-full rounded bg-transparent px-3 py-1 transition-colors outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 placeholder-opacity-25`}
      />
      <Button
        name="Generate random value"
        className="border-0 hover:text-fuchsia-700 text-4xl m-0 p-0 shadow-none"
        onClick={() => handleGenerate()}
      >
        <FaDice></FaDice>
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button
            ref={dropdownButtonRef}
            name="Select generator version"
            className="border-0 hover:text-fuchsia-700 p-0 w-8 mr-2 shadow-none inline-flex flex-row gap-1 px-0"
          >
            <span>{generatorLabel}</span>
            <FaChevronDown></FaChevronDown>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="Popover">
          <VersionSelector onSelected={onVersionSelected}></VersionSelector>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputBox;
