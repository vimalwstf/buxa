import Glass from "@/components/ui/Glass";
import { FaEllipsisVertical } from "react-icons/fa6";
import SeeAlert from "@/components/ui/SeeAlert";

export default function AlertCard() {
  return (
    <Glass>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-medium">Topic Name</h4>
          <FaEllipsisVertical />
        </div>
        <div>
          <span className="border-primary-green border py-1 px-2 rounded-md">
            Web Name
          </span>
        </div>
        <p className="text-text-third font-medium line-clamp-3 w-5/6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tristique, leo in pharetra aliquet, lorem nisl aliquam elit, sed
          vulputate sapien neque non magna. Sed tristique, leo in pharetra
          aliquet, lorem nisl aliquam elit, sed vulputate sapien neque non
          magna. Sed tristique, leo in pharetra aliquet, lorem nisl aliquam
          elit, sed vulputate sapien neque non magna.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-green w-[5px] h-[22px] rounded-md"></div>
            <SeeAlert />
            {/* <span className="text-primary-green">2</span> */}
          </div>
        </div>
      </div>
    </Glass>
  );
}
