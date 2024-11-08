import { FC, useState } from "react";

type Frequency = "Daily" | "Weekly" | "Monthly";

interface FrequencyModalProps {
  frequency: Frequency;
  onClose: () => void;
}

const FrequencyModal: FC<FrequencyModalProps> = ({ frequency, onClose }) => {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState(1);

  const confirmSelection = () => {
    let confirmationMessage = `Frequency confirmed: ${frequency}`;
    if (frequency === "Daily") confirmationMessage += ` at ${time}`;
    else if (frequency === "Weekly") confirmationMessage += ` on ${day}`;
    else if (frequency === "Monthly")
      confirmationMessage += ` on day ${date} of each month`;

    alert(confirmationMessage);
    onClose();
  };

  return (
    <div className="w-full p-4 bg-primary-light border rounded-md mb-4">
      <h3 className="text-[16px] font-medium text-white mb-2">
        Set {frequency} Frequency
      </h3>

      {frequency === "Daily" && (
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="block w-full py-2 border rounded-md mb-4 text-black outline-none"
        />
      )}
      {frequency === "Weekly" && (
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="block w-full py-2 border rounded-md mb-4 text-black outline-none"
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}
      {frequency === "Monthly" && (
        <input
          type="number"
          value={date}
          onChange={(e) =>
            setDate(Math.max(1, Math.min(31, Number(e.target.value))))
          }
          min={1}
          max={31}
          className="block w-full  p-2 border rounded-md mb-4 text-black outline-none"
          placeholder="Enter day of the month (1-31)"
        />
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={confirmSelection}
          className="px-4 py-2 bg-primary-green text-black rounded-md"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary-green text-black rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FrequencyModal;
