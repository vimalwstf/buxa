import { deleteDocument } from "@/actions/delete";
import useLocalStorage from "@/hooks/useLocalStorage";
import { snackBar } from "@/lib/utils";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteButton({
  id,
  index,
  label,
  onDelete,
}: {
  id: string;
  index?: number;
  label?: string;
  onDelete: () => void;
}) {
  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const handleDelete = async () => {
    if (!accessToken) return;

    try {
      const res = await deleteDocument(accessToken, id, index);

      if (res.status) {
        snackBar("Document deleted successfully", "success");
        onDelete();
      } else {
        snackBar(String(res), "error");
        console.error(res);
      }
    } catch (error) {
      snackBar("Failed to delete the document", "error");
      console.error("Error deleting document", error);
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
      className="w-full h-full flex items-center justify-center group delete-button"
    >
      <FaTrashAlt
        size={18}
        className="text-red-500 group-hover:text-red-500/80"
      />
      {label && <span>{label}</span>}
    </button>
  );
}
