import { useState } from "react";
interface ToggleButtonProps {
  label: string;
}

export default function ToggleButton({ label }: ToggleButtonProps) {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex items-center justify-between text-text-third hover:text-white mb-4">
      <span className="block font-medium ">{label}</span>

      <div className="flex items-center justify-center">
        <div
          className={`w-9 h-4 relative flex items-center bg-[#120F25] rounded-full cursor-pointer transition duration-300 ${
            isOn && "bg-[#695fb0]"
          }`}
          onClick={handleToggle}
        >
          <div className="flex gap-4 w-full"></div>
          {/* The circle */}
          <div
            className={`absolute bg-primary-green w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
              isOn && "translate-x-5"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
