import useClickOutside from "@/hooks/useClickOutisde";
import { DocumentInfo } from "@/types/type";
import { useRef, useState } from "react";

type OptionsModalProps = {
  docData: DocumentInfo;
};

function Publish({ docData }: OptionsModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className="text-black flex items-center gap-2 top-10 bg-cyan-400  px-4 py-2 text-sm rounded-md shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(!modalOpen);
          }}
        >
          Share
        </button>
        {modalOpen && (
          <div
            className="absolute top-full right-0 rounded-lg flex flex-col gap-2 overflow-y-auto px-4 py-2 bg-secondary-default shadow-lg z-10"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <form className="w-fit h-fit flex gap-2 flex-col cursor-pointer">
              <input type="text" placeholder="Enter API here" name="api-key" />
              <select name="site">
                <option value="1">Ghost</option>
                <option value="2">Wordpress</option>
              </select>
              <input type="url" placeholder="Enter URL here" name="url" />
              <button type="submit">Publish</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Publish;
