import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-text-third font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border font-medium text-[16px] text-gray-100 bg-transparent border-[#2c2c2c] rounded-[8px] outline-none"
      />
    </div>
  );
};

export default TextInput;
