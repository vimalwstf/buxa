import { useState } from "react";

interface DatePickerProps {
  value: number | null;
  onChange: (date: number) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [isCalenderOpen, setCalenderIsOpen] = useState(false);
  const toggleDatePicker = () => {
    setCalenderIsOpen(!isCalenderOpen);
  };
  return (
    <div className="relative w-full">
      <label
        onClick={toggleDatePicker}
        className="mb-2 block w-full p-2 border border-gray-200 rounded-md  outline-none hover:cursor-pointer"
      >
        {value ? `Selected Date: ${value}` : "Select Date"}
      </label>

      {isCalenderOpen && (
        <div className="absolute top-12 left-0 w-full bg-text-third border rounded-md  p-4 z-10">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => {
                  onChange(date);
                  toggleDatePicker();
                }}
                className={`aspect-square w-8 cursor-pointer px-2 py-1 text-center rounded-md  text-black
                  ${
                    date === value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-blue-100 text-black"
                  }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
