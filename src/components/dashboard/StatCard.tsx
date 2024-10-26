import { FC } from "react";
import { IconType } from "react-icons";
import Glass from "../ui/Glass";

interface StatCardProps {
  icon: IconType;
  title: string;
  count: number;
  bgColor?: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, title, count, bgColor }) => {
  return (
    <Glass>
      <div
        className={`flex flex-col gap-6 items-start justify-start p-6 rounded-[8px] h-[159px] `}
      >
        <div className="text-4xl  flex items-center justify-items-start gap-2">
          <span className="bg-primary-green p-3 rounded-full text-black">
            <Icon size={18} />
          </span>
          <span>
            <h2 className="text-lg font-medium text-gray-300">{title}</h2>
          </span>
        </div>

        <div>
          <p className="text-4xl font-semibold text-white">{count}</p>
        </div>
      </div>
    </Glass>
  );
};

export default StatCard;
