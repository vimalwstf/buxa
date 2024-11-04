interface DayOption {
  value: string;
  label: string;
}
interface WeekDayPickerProps {
  selectedDay: string;
  handleWeekDayChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const daysOfWeek: DayOption[] = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];
export default function WeekDayPicker({
  selectedDay,
  handleWeekDayChange,
}: WeekDayPickerProps) {
  return (
    <div className="w-full mb-4">
      <select
        value={selectedDay}
        onChange={handleWeekDayChange}
        className="mb-2 block w-full px-4 py-3 bg-primary-light border border-gray-200 rounded-md shadow-md outline-none hover:bg-black transition duration-200 ease-in-out"
      >
        {daysOfWeek.map((day) => (
          <option key={day.value} value={day.value}>
          
            {day.label}
          </option>
        ))}
      </select>
    </div>
  );
}
