import { FaArrowLeftLong } from "react-icons/fa6";

export default function ListButton({
  label,
  handleClick,
}: {
  label: string;
  handleClick: () => void;
}) {
  return (
    <button className="sm:text-2xl text-lg  flex items-center gap-2 text-white font-bold">
      <FaArrowLeftLong className="cursor-pointer" onClick={handleClick} />
      {label}
    </button>
  );
}
