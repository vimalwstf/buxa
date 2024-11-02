import { useState } from "react";
import Time from "./time";
import Frequency from "./frequency";
import { FaCirclePlus } from "react-icons/fa6";
import WeekDayPicker from "./weekDayPickerDropdown";
import DatePicker from "./datePicker";

export default function AlertFrequency() {
  const [selectedFrequency, setSelectedFrequency] = useState("daily");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const schedule = {
    selectedFrequency,
    selectedDate,
    weekDay,
    startTime,
    endTime,
  };
  console.log(schedule);
  const onDateChange = (value: number) => {
    setSelectedDate(value);
  };
  const onStartTimeChange = (value: string) => {
    setStartTime(value);
  };
  const onEndTimeChange = (value: string) => {
    setEndTime(value);
  };
  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFrequency(event.target.value);
  };
  const handleWeekDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWeekDay(event.target.value);
  };
  return (
    <div className="mb-4">
      <label className="block text-text-third font-medium mb-2">
        Alert frequency
      </label>
      <Frequency
        selectedFrequency={selectedFrequency}
        handleFrequencyChange={handleFrequencyChange}
      />
      <Time
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={onStartTimeChange}
        onEndTimeChange={onEndTimeChange}
      />
      <button
        type="button"
        className="flex items-center gap-2 bg-slate-300 text-black px-4 py-2 rounded w-full justify-center mb-4"
      >
        <FaCirclePlus />
        <span>Add more timing</span>
      </button>
      {selectedFrequency === "weekly" && (
        <WeekDayPicker
          selectedDay={weekDay}
          handleWeekDayChange={handleWeekDayChange}
        />
      )}
      {selectedFrequency === "monthly" && (
        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
      )}
    </div>
  );
}
