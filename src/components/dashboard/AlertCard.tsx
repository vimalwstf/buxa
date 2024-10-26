import Glass from "@/components/ui/Glass";
import { FaEllipsisVertical } from "react-icons/fa6";
import SeeAlert from "@/components/ui/SeeAlert";

export default function AlertCard() {
  return (
    <Glass>
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-medium">Topic Name</h4>
            <FaEllipsisVertical className="text-text-third" />
          </div>
          <span className="border-primary-green bg-[#A6FF7C1A] border py-1 px-2 rounded-md w-fit">
            Web Name
          </span>
        </div>
        <p className="text-text-third text-sm font-medium line-clamp-3 leading-4 w-5/6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tristique, leo in pharetra aliquet, lorem nisl aliquam elit, sed
          vulputate sapien neque non magna. Sed tristique, leo in pharetra
          aliquet, lorem nisl aliquam elit, sed vulputate sapien neque non
          magna. Sed tristique, leo in pharetra aliquet, lorem nisl aliquam
          elit, sed vulputate sapien neque non magna.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-text-third">Posted on: </span>
            <span>20 Feb 2024</span>
          </div>
          <SeeAlert />
        </div>
      </div>
    </Glass>
  );
}
