import useClickOutside from "@/hooks/useClickOutisde";
import { DocumentInfo } from "@/types/type";
import { useRef, useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";

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
      <div className="relative" ref={modalRef}>
        <button
          type="button"
          className="bg-secondary-default text-white flex items-center gap-2 top-10 px-4 py-2 text-sm rounded-md font-medium"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(!modalOpen);
          }}
        >
          <IoShareSocialSharp />
          <span>Share</span>
        </button>
        {modalOpen && (
          <div
            className="absolute top-full right-0 rounded-lg flex flex-col gap-2 overflow-y-auto px-4 py-2 bg-secondary-default shadow-lg z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <form className="w-fit h-fit flex gap-2 flex-col cursor-pointer z-10">
              <input
                type="text"
                placeholder="Enter API here"
                name="api-key"
                className="p-2 rounded-md outline-none text-black"
              />
              <select
                name="site"
                className="p-2 rounded-md outline-none text-black "
              >
                <option value="" disabled selected hidden>
                  Choose a site
                </option>
                <option value="1">Ghost</option>
                <option value="2">Wordpress</option>
              </select>
              <input
                type="url"
                placeholder="Enter URL here"
                name="url"
                className="p-2 rounded-md outline-none text-black"
              />
              <button
                type="submit"
                className="bg-primary-default text-white p-2 rounded-md hover:font-bold"
              >
                Publish
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Publish;
