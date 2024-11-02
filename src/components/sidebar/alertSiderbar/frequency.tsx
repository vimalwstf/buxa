type FrequencyProps = {
  selectedFrequency: string;
  onFrequencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Frequency = ({
  selectedFrequency,
  onFrequencyChange,
}: FrequencyProps) => {
  return (
    <div>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="alertFrequency"
          value="daily"
          checked={selectedFrequency === "daily"}
          onChange={onFrequencyChange}
          className="mr-2"
        />
        <span>Daily</span>
      </label>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="alertFrequency"
          value="weekly"
          checked={selectedFrequency === "weekly"}
          onChange={onFrequencyChange}
          className="mr-2"
        />
        <span>Weekly</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="alertFrequency"
          value="monthly"
          checked={selectedFrequency === "monthly"}
          onChange={onFrequencyChange}
          className="mr-2"
        />
        <span>Monthly</span>
      </label>
    </div>
  );
};

export default Frequency;
