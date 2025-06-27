import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Button } from "./Button";
import { FaChevronDown, FaDice } from "react-icons/fa";

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
  const [value, setValue] = useState("");

  const handleGenerate = () => {
    setValue(v4());
  };

  useEffect(() => {
    if (onValueChanged) {
      onValueChanged(value);
    }
  }, [onValueChanged, value]);

  return (
    <div
      className={`flex items-center rounded-full border border-input p-1.5 h-20 w-full shadow-md sm:text-lg md:text-xl lg:text-xl ${className}`}
    >
      <input
        ref={nativeInput}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => {
          nativeInput.current?.select();
        }}
        placeholder={placeholder ?? ""}
        className={`block h-full w-full rounded bg-transparent px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder-opacity-25`}
      />
      <Button
        className="border-0 hover:text-fuchsia-700 text-4xl mr-0 pr-0 shadow-none"
        onClick={() => handleGenerate()}
      >
        <FaDice></FaDice>
      </Button>
      <Button className="border-0 hover:text-fuchsia-700 text-xl px-0 w-4 mr-4 shadow-none">
        <FaChevronDown></FaChevronDown>
      </Button>
    </div>
  );
};

export default InputBox;
