import { useState } from "react";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number): Date[] => {
    const date = new Date(currentYear, month, 1);
    const dates: Date[] = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  const daysInMonth =
    selectedMonth !== null ? getDaysInMonth(selectedMonth) : [];

  return (
    <div className="w-full text-black">
      <div className="mb-4">
        <select
          id="month"
          value={selectedMonth ?? ""}
          onChange={handleMonthChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a month
          </option>
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {selectedMonth !== null && (
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysInWeek.map((day) => (
            <div key={day} className="font-semibold text-white">
              {day}
            </div>
          ))}
          {daysInMonth.map((date) => (
            <button
              key={date.toString()}
              onClick={() => handleDateClick(date)}
              className={`p-2 rounded-md ${
                selectedDate &&
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              } hover:bg-blue-400 hover:text-white`}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
