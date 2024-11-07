import useClickOutside from "@/hooks/useClickOutisde";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DocumentInfo } from "@/types/type";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useRef, useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";

type OptionsModalProps = {
  docData: DocumentInfo;
};

function Publish({ docData }: OptionsModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const closeModal = () => {
    setModalOpen(false);
  };
  useClickOutside(modalRef, closeModal);

  const handleSubmit = async (formData: FormData) => {
    if (accessToken) {
      const metadata = {
        apiKey: formData.get("api-key") as string,
        postOn: formData.get("site") as string,
        ghostURL: formData.get("url") as string,
        content: docData.name,
        metadata: docData.metadata,
        keyword: docData.keyword,
        tag: docData.tag,
      };

      console.log("---------------blog---------------", metadata);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/blog`,
          { data: metadata },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response?.data?.status) {
          enqueueSnackbar("Document publish successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      } catch (err) {
        const error = err as any;
        enqueueSnackbar(
          `Failed to publish document: ${
            error?.response?.data?.error as string
          }`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
        );
      }
    }
  };

  return (
    <div className="relative" ref={modalRef}>
      <button
        type="button"
        className="bg-secondary-default text-white flex items-center gap-2 top-10 px-4 py-2 text-sm rounded-md font-medium"
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(!modalOpen);
        }}
      >
        <span>Publish to Site</span>
      </button>
      {modalOpen && (
        <div
          className="absolute top-full right-0 rounded-lg flex flex-col gap-2 overflow-y-auto px-4 py-2 bg-secondary-default shadow-lg z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            action={handleSubmit}
            className="w-fit h-fit flex gap-2 flex-col cursor-pointer z-10"
          >
            <input
              required
              type="text"
              placeholder="Enter API here"
              name="api-key"
              className="p-2 rounded-md outline-none text-black"
            />
            <select
              name="site"
              required
              className="p-2 rounded-md outline-none text-black "
            >
              <option value="" disabled selected hidden>
                Choose a site
              </option>
              <option value="ghost">Ghost</option>
              <option value="wordpress">Wordpress</option>
            </select>
            <input
              type="url"
              required
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
  );
}

export default Publish;
