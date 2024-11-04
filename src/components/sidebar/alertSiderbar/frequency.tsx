import React from "react";

type FrequencyProps = {
  selectedFrequency: string;
  onFrequencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Frequency = ({
  selectedFrequency,
  onFrequencyChange,
}: FrequencyProps) => {
  return (
    <div className="flex gap-1 flex-col">
      <label className="flex items-center mb-1 cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="daily"
          checked={selectedFrequency === "daily"}
          onChange={handleFrequencyChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Daily</span>
      </label>
      <label className="flex items-center mb-2 cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="weekly"
          checked={selectedFrequency === "weekly"}
          onChange={handleFrequencyChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Weekly</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="alertFrequency"
          value="monthly"
          checked={selectedFrequency === "monthly"}
          onChange={handleFrequencyChange}
          className="custom-checkbox appearance-none h-5 w-5 border border-gray-200 rounded-md checked:bg-primary-green checked:border-transparent outline-none transition-all duration-200"
        />
        <span className="ml-2">Monthly</span>
      </label>
    </div>
  );
};

export default Frequency;
