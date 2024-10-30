import AlertCard from "./AlertCard";
// import { CiCalendar } from "react-icons/ci";

export default function Alerts() {
  return (
    <div className="element max-h-screen overflow-auto max-w-[28rem] mt-[16px]">
      <div className="text-text-third flex justify-between items-center px-2 pb-2">
        <h3 className="text-xl font-medium">Alerts</h3>
        {/* <div className="flex items-center gap-2">
          <span>Sep 27, 2024 - Oct 12, 2024</span>
          <CiCalendar size={24} />
        </div> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
        {
          // TODO: Add 10 alerts
          Array(10)
            .fill(0)
            .map((_, i) => (
              <AlertCard key={i} />
            ))
        }
      </div>
    </div>
  );
}
