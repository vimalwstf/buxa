import { useState } from "react";
interface ToggleButtonProps {
    label: string;
  }
  
  export default function ToggleButton({ label }: ToggleButtonProps) {
    const [isOn, setIsOn] = useState<boolean>(false);

    const handleToggle = () => {
    setIsOn(!isOn);
  };

    return(
        <div className="flex items-center justify-between text-text-third hover:text-white">
            <span className="block font-medium ">{label}</span>

            <div className="flex items-center justify-center">
            <div className={`w-12 h-5 flex items-center bg-[#120F25] rounded-full cursor-pointer transition duration-300`} 
                onClick={handleToggle}>
                <div className='flex gap-4 w-full'>
                </div>
                {/* The circle */}
                <div className={`absolute bg-primary-green w-5 h-5 rounded-full shadow-md transform transition duration-300 ${isOn && 'translate-x-7'}`}></div>
            </div>
            </div>
        </div>
    )
}