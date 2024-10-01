'use client';

import { useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(1); 
  const [hover, setHover] = useState<boolean>(false);  

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value)); 
  };

  const getValues = (value: number): string => {
    if (value === 1) {
      return "Low";
    } else if (value === 2) {
      return "Mid";
    } else {
      return "High";
    }
  };

  return (
    <div className="progressBar relative mb-4">
      <label htmlFor="steps-range" className="block mb-2 text-[#64748b] font-medium text-lg">
        Research Level
      </label>
      <input
        id="steps-range"
        type="range"
        min="1"
        max="3"
        value={progress}
        step="1"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={handleRangeChange} 
        onMouseEnter={() => setHover(true)}  
        onMouseLeave={() => setHover(false)} 
        style={{
          background: `linear-gradient(to right, #6366f1 0%, #3b82f6 ${(progress - 1) * 50}%, #e5e7eb ${(progress - 1) * 50}%, #e5e7eb 100%)`,
        }}
      />
      {hover && (
        <div className="absolute top-20 left-0 transform translate-x-1/2 -translate-y-full mt-1 bg-gray-700 text-white text-xs rounded py-1 px-2">
          {getValues(progress)}
        </div>
      )}
      {/* <div className="mt-2 text-sm text-gray-900 dark:text-white">Level: {getValues(progress)}</div> */}
    </div>
  );
};

export default ProgressBar;
