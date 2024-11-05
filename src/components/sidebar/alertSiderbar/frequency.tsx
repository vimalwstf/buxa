import React from "react";

type FrequencyProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Frequency = ({ value, onChange }: FrequencyProps) => {
  return (
    <div className="flex gap-1 flex-col">
      <label className="flex items-center mb-1 cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="daily"
          checked={value === "daily"}
          onChange={onChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Daily</span>
      </label>
      <label className="flex items-center mb-2 cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="weekly"
          checked={value === "weekly"}
          onChange={onChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Weekly</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="monthly"
          checked={value === "monthly"}
          onChange={onChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Monthly</span>
      </label>
    </div>
  );
};

export default Frequency;
