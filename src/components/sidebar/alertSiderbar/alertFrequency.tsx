import { useState } from "react";
import Time from "./time";
import Frequency from "./frequency";
import { FaCirclePlus } from "react-icons/fa6";
import WeekDayPicker from "./weekDayPickerDropdown";
import DatePicker from "./datePicker";

const maxTimeSlots = 2;

export default function AlertFrequency() {
  const [selectedFrequency, setSelectedFrequency] = useState("daily");
  const [timeSlots, setTimeSlots] = useState([{ startTime: "", endTime: "" }]);
  const [weekDay, setWeekDay] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const schedule = {
    selectedFrequency,
    selectedDate,
    weekDay,
    timeSlots,
  };

  console.log(schedule);

  const onDateChange = (value: number) => {
    setSelectedDate(value);
  };

  const onTimeChange = (
    index: number,
    type: "start" | "end",
    value: string
  ) => {
    const updatedSlots = timeSlots.map((slot, i) => {
      if (i === index) {
        return {
          ...slot,
          [type === "start" ? "startTime" : "endTime"]: value,
        };
      }
      return slot;
    });
    setTimeSlots(updatedSlots);
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFrequency(event.target.value);
  };

  const handleWeekDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWeekDay(event.target.value);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: "", endTime: "" }]);
  };

  const deleteTimeSlot = (index: number) => {
    if (timeSlots.length === 1) return;
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
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

      {timeSlots.map((slot, index) => (
        <Time
          key={index}
          startTime={slot.startTime}
          endTime={slot.endTime}
          onDelete={() => deleteTimeSlot(index)}
          onStartTimeChange={(value) => onTimeChange(index, "start", value)}
          onEndTimeChange={(value) => onTimeChange(index, "end", value)}
        />
      ))}

      <button
        type="button"
        onClick={addTimeSlot}
        disabled={timeSlots.length === maxTimeSlots}
        className="flex items-center gap-2 bg-text-third text-white font-medium px-4 py-2 rounded w-full justify-center mb-4 disabled:cursor-not-allowed"
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
