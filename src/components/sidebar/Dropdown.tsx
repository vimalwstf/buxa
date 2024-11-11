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

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDropdown(dropdownOpen ? "" : name);
  };

  return (
    <fieldset
      className={`mb-4 text-text-third ${dropdownOpen ? "shadow-lg rounded-md" : ""}`}
    >
      <button type="button" className="w-full" onClick={toggleDropdown}>
        <legend className="font-medium w-full mb-2 flex justify-between items-center">
          <span>{label}</span>
          {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
        </legend>
        {selected && (
          <p
            className={`w-full text-left ${
              dropdownOpen
                ? "bg-primary-green p-2 rounded-t-md text-black"
                : "text-text-third p-2 rounded-md border border-gray-200"
            }`}
          >
            {selected}
          </p>
        )}
      </button>
      <div className="relative">
        {dropdownOpen && (
          <ul
            id={`${name}-options`}
            className="custom-scrollbar bg-primary-light mt-2 rounded-md max-h-40 overflow-y-auto overflow-x-hidden absolute w-full z-40 border border-gray-200"
            style={{
              top: "100%",
            }}
          >
            {options.map((opt, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="block w-full text-left px-2 py-1 rounded-md m-1 hover:bg-primary-green hover:text-black"
                  onClick={() => handleOptionSelect(opt)}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hidden Input to Capture the Selected Value */}
      <input type="hidden" name={name} value={selected} />
    </fieldset>
  );
}
