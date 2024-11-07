import { IoMdDocument } from "react-icons/io";

export default function SaveButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button
      className="text-black flex items-center gap-2 top-10 bg-primary-green  px-4 py-2 text-sm rounded-md"
      onClick={handleClick}
    >
      <IoMdDocument />
      <span>Save</span>
    </button>
  );
}
