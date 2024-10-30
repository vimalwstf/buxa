import { CgFileAdd } from "react-icons/cg";

export default function NewButton({
  label,
  createNewDocument,
}: {
  label: string;
  createNewDocument: () => void;
}) {
  return (
    <button
      className="text-black px-4 py-2 text-sm  rounded-md shadow-md bg-primary-green "
      onClick={createNewDocument}
    >
      <CgFileAdd size={22} className="inline sm:mr-2" />
      <span className="sr-only sm:not-sr-only ">{label}</span>
    </button>
  );
}
