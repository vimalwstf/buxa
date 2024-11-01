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
    <div className="flex flex-col w-full gap-y-1 mb-4">
      {(["Daily", "Weekly", "Monthly"] as Frequency[]).map((frequency) => (
        <label
          key={frequency}
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedFrequency === frequency}
            onChange={() => onFrequencyChange(frequency)}
            className="form-checkbox h-4 w-4 rounded-md"
          />
          <span className="text-text-third font-medium">{frequency}</span>
        </label>
      ))}
    </div>
  );
};

export default FrequencyOptions;
