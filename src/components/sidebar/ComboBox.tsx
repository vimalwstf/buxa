"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface ComboBoxTagProps {
  tags: string[];
  selectedTags: string[];
  placeholder?: string;
  handleSelect: (tag: string) => void;
}

function ComboBox({
  tags,
  selectedTags,
  placeholder,
  handleSelect,
}: ComboBoxTagProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col bg-black shadow-md rounded-md p-3">
      <div className="flex items-center border border-gray-200  rounded-lg p-1 shadow-sm mb-2">
        <IoSearch className="text-primary-green ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full px-2 py-1 outline-none text-sm text-white placeholder-gray-50 bg-transparent"
        />
      </div>

      <div className="flex flex-wrap">
        {filteredTags.map((tag, i) => (
          <Tag
            key={i}
            tag={tag}
            selected={selectedTags.includes(tag)}
            onClick={() => {
              handleSelect(tag);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Tag({
  tag,
  selected,
  onClick,
}: {
  tag: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <span
      className={`font-medium hover:bg-gray-200 text-sm px-2 py-1 rounded-md m-1 cursor-pointer
    ${selected ? "bg-primary-green text-black" : "bg-black text-white"}
  `}
      onClick={onClick}
    >
      {tag}
    </span>
  );
}

export default ComboBox;
