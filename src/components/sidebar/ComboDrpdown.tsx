import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SelectionBox from "./SelectionBox";
import { LiaTimesSolid } from "react-icons/lia";

type ComboDropdownProps = {
  dropdown: string;
  setDropdown: (name: string) => void;
  name: string;
  searchLabel: string;
  selectedTags: string[];
  allTags: string[];
  handleSelect: (tag: string) => void;
};

export default function ComboDropdown({
  dropdown,
  setDropdown,
  name,
  searchLabel,
  selectedTags,
  allTags,
  handleSelect,
}: ComboDropdownProps) {
  const dropdownOpen = dropdown === name;

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(dropdownOpen ? "" : name);
        }}
      >
        <label className="block text-text-third font-medium mb-2">
          Set {name}
        </label>
        {dropdownOpen ? (
          <FiChevronUp className="text-text-third " />
        ) : (
          <FiChevronDown className="text-text-third " />
        )}
      </div>
      {dropdownOpen ? (
        <SelectionBox
          tags={allTags}
          selectedTags={selectedTags}
          placeholder={searchLabel}
          handleSelect={handleSelect}
        />
      ) : (
        <div className="flex flex-wrap">
          {selectedTags.map((tag, i) => (
            <div
              key={i}
              className="flex flex-row items-center gap-2 border-2 px-2 py-1 rounded-lg m-1"
            >
              <span>{tag}</span>
              <LiaTimesSolid
                className="cursor-pointer text-primary-green"
                onClick={() => handleSelect(tag)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
