import React from "react";
import Glass from "../ui/Glass";
import StatLevelCard from "./StatLevelCard";

const StatLevel = () => {
  const contentCredits = 90;
  const researchCredits = 12;
  const alertCredits = 111;
  return (
    <div className="m-3">
      <Glass>
        <div className="flex flex-col md:flex-row justify-between gap-10 w-full p-6 rounded-[8px]">
          <div className="flex flex-col justify-center  gap-4">
            <div className="flex gap-4 justify-center items-center ">
              <h2 className="text-lg font-medium text-gray-300  text-center line-clamp-2">
                Total Credit usage
              </h2>
              <p className="text-4xl font-semibold text-white">467</p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <h2 className="text-lg font-medium text-gray-300 align-left">
                Credit balance
              </h2>
              <p className="text-4xl font-semibold text-white">{90}</p>
            </div>
            <button className="bg-primary-green font-medium text-black rounded-[8px] px-4 py-2 w-[10vw] hover:bg-green-500">
              Top up
            </button>
          </div>
          <div className="flex gap-4">
            <StatLevelCard
              title="Content"
              credits={contentCredits}
              number={20}
            />
            <StatLevelCard
              title="Research"
              credits={researchCredits}
              number={10}
            />
            <StatLevelCard title="Alert" credits={alertCredits} number={50} />
          </div>
        </div>
      </Glass>
    </div>
  );
};

export default StatLevel;
