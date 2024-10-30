import { FC } from "react";

type Frequency = "Daily" | "Weekly" | "Monthly";

interface FrequencyOptionsProps {
  selectedFrequency: Frequency | null;
  onFrequencyChange: (frequency: Frequency) => void;
}

const FrequencyOptions: FC<FrequencyOptionsProps> = ({
  selectedFrequency,
  onFrequencyChange,
}) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      {(["Daily", "Weekly", "Monthly"] as Frequency[]).map((frequency) => (
        <label key={frequency} className="flex items-center space-x-2 hover:cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFrequency === frequency}
            onChange={() => onFrequencyChange(frequency)}
            className="form-checkbox h-5 w-5 rounded-md text-blue-600"
          />
          <span className="text-white font-medium">{frequency}</span>
        </label>
      ))}
    </div>
  );
};

export default FrequencyOptions;
