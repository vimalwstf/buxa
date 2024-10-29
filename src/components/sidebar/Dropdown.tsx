import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type DropdownProps = {
  name: string;
  selected: string;
  options: string[];
  label: string;
  handleSelect: (option: string) => void;
  dropdown: string;
  setDropdown: (name: string) => void;
};

export default function Dropdown({
  name,
  selected,
  options,
  label,
  handleSelect,
  dropdown,
  setDropdown,
}: DropdownProps) {
  const dropdownOpen = dropdown === name;

  const handleOptionSelect = (opt: string) => {
    handleSelect(opt);
    setDropdown("");
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDropdown(dropdownOpen ? "" : name);
  };

  return (
    <div
      className={` mb-4 ${dropdownOpen ? "shadow-lg rounded-md bg-black" : ""}`}
    >
      <div
        className={`flex justify-between  items-center cursor-pointer ${
          dropdownOpen
            ? "bg-primary-green p-2 rounded-t-md text-black"
            : "text-text-third"
        }`}
        onClick={toggleDropdown}
      >
        <label className="block mb-1 font-medium">{label}</label>
        {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {dropdownOpen && (
        <div className="mt-2 rounded-md max-h-40 overflow-y-auto element scrollbar-hidden">
          {options.map((opt, i) => (
            <button
              type="button"
              key={i}
              className="block w-[95%] text-left px-2 py-1 rounded-md m-1 hover:bg-primary-green hover:text-black"
              onClick={() => handleOptionSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {!dropdownOpen && selected && (
        <div
          onClick={toggleDropdown}
          className="mt-2 border border-gray-200 rounded-md p-2"
        >
          {selected}
        </div>
      )}
    </div>
  );
}
