import { SlCalender } from "react-icons/sl";
import AlertCard from "./AlertCard";

export default function Alerts() {
  return (
    <div className="max-h-full overflow-auto max-w-[30rem] mx-2 mr-4">
      <div className="text-text-third flex justify-between items-center px-2 pb-2">
        <h3 className="text-xl font-medium">Alerts</h3>
        <div className="flex items-center gap-2">
          <span>Sep 27, 2024 - Oct 12, 2024</span>
          <SlCalender />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 ">
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
