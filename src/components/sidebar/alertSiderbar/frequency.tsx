type FrequencyProps = {
  selectedFrequency: string;
  handleFrequencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Frequency = ({
  selectedFrequency,
  handleFrequencyChange,
}: FrequencyProps) => {
  return (
    <div>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="alertFrequency"
          value="daily"
          checked={selectedFrequency === "daily"}
          onChange={handleFrequencyChange}
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
          onChange={handleFrequencyChange}
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
          onChange={handleFrequencyChange}
          className="mr-2"
        />
        <span>Monthly</span>
      </label>
    </div>
  );
};

export default Frequency;
