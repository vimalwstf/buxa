import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type DropDownProps = {
  options: string[];
  selectedOption: string;
  setOption: (option: string) => void;
  label: string;
  setToneOpen?: (isOpen: boolean) => void;
  setPersonalityOpen?: (isOpen: boolean) => void;
};

const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedOption,
  setOption,
  label,
  setToneOpen,
  setPersonalityOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close other dropdowns when opening this one
  useEffect(() => {
    if (isOpen) {
      if (setToneOpen) setToneOpen(false);
      if (setPersonalityOpen) setPersonalityOpen(false);
    }
  }, [isOpen, setToneOpen, setPersonalityOpen]);

  return (
    <div className={`mb-4 ${isOpen ? "shadow-lg rounded-md bg-black" : ""}`}>
      <div
        className={`flex justify-between items-center cursor-pointer ${
          isOpen
            ? "bg-primary-green p-2 rounded-t-md text-black"
            : "text-text-third"
        }`}
        onClick={toggleDropdown}
      >
        <label className="block mb-[2px] font-medium">{label}</label>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="mt-2 rounded-md max-h-40 overflow-y-auto element scrollbar-hidden">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className="block w-[95%] text-left px-2 py-1 rounded-md m-1 hover:bg-primary-green hover:text-black"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {!isOpen && selectedOption && (
        <div
          onClick={toggleDropdown}
          className="mt-2 border border-gray-200 rounded-md p-2"
        >
          {selectedOption}
        </div>
      )}
    </div>
  );
};

export default DropDown;
