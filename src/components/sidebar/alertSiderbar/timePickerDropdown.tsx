const TimePicker = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const timeLabel = `${displayHour}:00 ${ampm}`;
      times.push(timeLabel);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-2 text-text-third bg-primary-light border border-gray-200 rounded-md  focus:outline-none focus:bg-zinc-800"
      >
        <option value="">time</option>
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
