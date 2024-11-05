import React from "react";
type StatLevelCardProps = {
  title: string;
  credits: number;
  number: number;
};
const StatLevelCard: React.FC<StatLevelCardProps> = ({
  title,
  credits,
  number,
}) => {
  return (
    <div className="relative w-[144px] h-[194px] rounded-md overflow-hidden bg-[#111116] border">
      <div className="absolute inset-0 rounded-md  "></div>

      <div className="relative w-full h-full rounded-md overflow-hidden text-gray-300">
        <div className="flex flex-col items-start p-2">
          <h2 className="text-lg font-medium text-white z-10">{title}</h2>
          <p className="text-lg font-medium text-gray-300 z-10">
            {credits} credits
          </p>
        </div>

        <div
          className="absolute bottom-0 bg-[url('../../public/images/stat_level.svg')] bg-cover border border-[#A6FF7C80] w-full rounded-md transition-all duration-300"
          style={{
            height: `${number}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default StatLevelCard;
