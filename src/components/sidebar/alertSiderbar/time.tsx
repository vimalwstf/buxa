import { MdDelete } from "react-icons/md";
import TimePicker from "./timePickerDropdown";

type TimeProps = {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
};
const Time = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeProps) => {
  return (
    <div className="flex items-center mb-2 w-full">
      <label>
        <MdDelete size={24} />
      </label>
      <TimePicker onChange={onStartTimeChange} value={startTime} />
      <div className="w-4 h-1 bg-slate-300"></div>
      <TimePicker onChange={onEndTimeChange} value={endTime} />
    </div>
  );
};

export default Time;
