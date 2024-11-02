import { MdDelete } from "react-icons/md";
import TimePicker from "./timePickerDropdown";

type TimeProps = {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onDelete: () => void;
};
const Time = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onDelete,
}: TimeProps) => {
  return (
    <div className="flex gap-1 items-center mb-2 w-full">
      <button onClick={onDelete} className="text-text-third">
        <MdDelete size={24} />
      </button>
      <TimePicker onChange={onStartTimeChange} value={startTime} />
      <div className="w-4 h-1 bg-slate-300"></div>
      <TimePicker onChange={onEndTimeChange} value={endTime} />
    </div>
  );
};

export default Time;
