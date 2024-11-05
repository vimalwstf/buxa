interface DayOption {
  value: string;
  label: string;
}
interface WeekDayPickerProps {
  value: string;
  onChange: (value: string) => void;
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
export default function WeekDayPicker({ value, onChange }: WeekDayPickerProps) {
  return (
    <div className="w-full mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mb-2 block w-full p-2 bg-black border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 "
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
