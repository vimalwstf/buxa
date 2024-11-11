import useClickOutside from "@/hooks/useClickOutisde";
import { useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

type OptionsModalProps = {
  id: string;
  handleDeleteData: (id: string) => void;
};

function OptionsModal({ id, handleDeleteData }: OptionsModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <FaEllipsisVertical
        className="cursor-pointer text-white"
        size={18}
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(!modalOpen);
        }}
      />
      {modalOpen && (
        <div
          className="absolute rounded-lg flex flex-col gap-2 overflow-y-auto px-4 py-2 bg-secondary-default shadow-lg z-10"
          onClick={() => setModalOpen(false)}
          ref={modalRef}
        >
          <div
            className="flex gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteData(id);
              setModalOpen(false);
            }}
          >
            <FaTrashAlt size={18} className="text-red-500" />
            <span>Delete</span>
          </div>
        </div>
      )}
    </>
  );
}

export default OptionsModal;
