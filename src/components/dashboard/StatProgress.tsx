import React from 'react';

type StatProgressProps = {
    title: string;
    credits: number;
    number: number;
};

const StatProgress: React.FC<StatProgressProps> = ({ title, credits, number }) => {
  return (
    <div className="relative w-[144px] h-[194px] rounded-md overflow-hidden p-[1px]">
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#A6FF7C4D] via-[#6366F14D] to-[#A6FF7C4D] -z-10"></div>
      
      <div className="relative w-full h-full bg-[#111116] rounded-md overflow-hidden text-gray-300">
        <div className="flex flex-col items-start p-2">
          <h2 className="text-sm font-medium text-white z-10">{title}</h2>
          <p className="text-lg font-medium text-gray-300 z-10">{credits} credits</p>
        </div>
        
        <div
          className="absolute bottom-0 bg-[url('../../public/images/fill.svg')] bg-cover border border-[#A6FF7C80] w-full rounded-md transition-all duration-300"
          style={{
            height: `${number}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatProgress;
