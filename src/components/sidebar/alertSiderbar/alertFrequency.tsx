import { useState } from "react";
import Time from "./time";
import Frequency from "./frequency";
import { FaCirclePlus } from "react-icons/fa6";
import WeekDayPicker from "./weekDayPickerDropdown";
import DatePicker from "./datePicker";

export default function AlertFrequency() {
  const [selectedFrequency, setSelectedFrequency] = useState("daily");
  const [timeSlots, setTimeSlots] = useState([{ startTime: "", endTime: "" }]);
  const [weekDay, setWeekDay] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // const schedule = {
  //   selectedFrequency,
  //   selectedDate,
  //   weekDay,
  //   timeSlots,
  // };

  const onDateChange = (value: number) => {
    setSelectedDate(value);
  };

  const onTimeChange = (
    index: number,
    type: "start" | "end",
    value: string,
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

  const onFrequencyChange = (value: string) => {
    setSelectedFrequency(value);
  };

  const onWeekDayChange = (value: string) => {
    setWeekDay(value);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: "", endTime: "" }]);
  };

  const onDeleteTimeSlot = (index: number) => {
    // console.log(timeSlots);
    if (timeSlots.length === 1) return;
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
  };

  return (
    <div className="mb-4">
      <label className="block text-text-third font-medium mb-2">
        Alert frequency
      </label>

      <Frequency value={selectedFrequency} onChange={onFrequencyChange} />

      {timeSlots.map((slot, index) => (
        <Time
          key={index}
          startTime={slot.startTime}
          endTime={slot.endTime}
          onDelete={() => onDeleteTimeSlot(index)}
          onStartTimeChange={(value) => onTimeChange(index, "start", value)}
          onEndTimeChange={(value) => onTimeChange(index, "end", value)}
        />
      ))}

      <button
        type="button"
        onClick={addTimeSlot}
        disabled={timeSlots.length === 2}
        className="flex items-center gap-2 bg-slate-300 text-black px-4 py-2 rounded w-full justify-center mb-4 disabled:cursor-not-allowed"
      >
        <FaCirclePlus />
        <span>Add more timing</span>
      </button>

      {selectedFrequency === "weekly" && (
        <WeekDayPicker value={weekDay} onChange={onWeekDayChange} />
      )}
      {selectedFrequency === "monthly" && (
        <DatePicker value={selectedDate} onChange={onDateChange} />
      )}
    </div>
  );
}
