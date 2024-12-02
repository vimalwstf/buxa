import useClickOutside from "@/hooks/useClickOutisde";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  BlogAPIInfo,
  DocumentInfo,
  GhostBlogInfo,
  WordpressBlogInfo,
} from "@/types/type";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useRef, useState } from "react";

function PublishBlogModal({ docData }: { docData: DocumentInfo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<"ghost" | "wordpress">("ghost");

  const { value: user } = useLocalStorage<{ accessToken: string }>("user");
  const accessToken = user?.accessToken;

  const { value: apiData } = useLocalStorage<BlogAPIInfo>("apiData");

  const closeModal = () => {
    if (!isPublishing) {
      setModalOpen(false);
    }
  };
  useClickOutside(modalRef, closeModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      setIsPublishing(true);
      const formData = new FormData(e.target as HTMLFormElement);

      const data =
        selected === "ghost"
          ? {
              apiKey: formData.get("ghostApi") as string,
              ghostURL: formData.get("url") as string,
            }
          : {
              username: formData.get("username") as string,
              password: formData.get("password") as string,
              URL: formData.get("url") as string,
            };
      const metadata = {
        data: data,
        content: docData.name,
        metadata: docData.metadata,
        keyword: docData.keyword,
        tag: docData.tag,
        postOn: selected,
      };

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/blog`,
          { data: metadata },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response?.status === 200) {
          enqueueSnackbar("Document published successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setModalOpen(false);
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
          }
        );
      } finally {
        setIsPublishing(false);
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="bg-secondary-default text-white px-4 py-2 text-sm rounded-md font-medium"
        onClick={() => setModalOpen(true)}
      >
        Publish to Site
      </button>
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
          <div
            className="fixed inset-0 flex items-center justify-center z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={modalRef}
              className="relative bg-primary-light rounded-lg flex flex-col gap-2 p-6 pt-10 shadow-lg w-96 border-2 border-gray-200"
            >
              <button
                className="absolute top-0 px-2 py-1 right-4 text-white text-xl font-bold hover:text-red-500 duration-200"
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="text-center">
                <h1 className="px-2 mb-6 text-3xl font-bold">
                  Choose your site to publish on
                </h1>
              </div>
              <div className="flex gap-6">
                <label className="text-text-light flex gap-2">
                  <input
                    required
                    type="radio"
                    checked={selected === "ghost"}
                    name="radio"
                    value="ghost"
                    onChange={() => setSelected("ghost")}
                  />
                  <span>Ghost</span>
                </label>
                <label className="text-text-light flex gap-2">
                  <input
                    required
                    type="radio"
                    checked={selected === "wordpress"}
                    name="radio"
                    value="wordpress"
                    onChange={() => setSelected("wordpress")}
                  />
                  <span>Wordpress</span>
                </label>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full h-full flex gap-4 flex-col cursor-pointer"
              >
                {selected === "ghost" &&
                  (apiData?.ghostBlogs ? (
                    <Ghost ghostData={apiData?.ghostBlogs} />
                  ) : (
                    <p className="text-center">No ghost APIs found</p>
                  ))}

                {selected === "wordpress" &&
                  (apiData?.wordpressBlogs ? (
                    <Wordpress wordpressData={apiData?.wordpressBlogs} />
                  ) : (
                    <p className="text-center">No wordpress APIs found</p>
                  ))}

                <button
                  type="submit"
                  className="bg-primary-green text-black p-2 rounded-md hover:scale-105 duration-200"
                  disabled={isPublishing}
                >
                  {isPublishing ? "Publishing..." : "Publish"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Ghost({ ghostData }: { ghostData: GhostBlogInfo[] }) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <select
        name="url"
        id="ghostURL"
        className="p-2 rounded-md outline-none text-black"
      >
        {ghostData.map(({ URL }: { URL: string }, index: number) => (
          <option
            key={index}
            value={URL}
            className="p-2 rounded-md outline-none text-black"
            onClick={() => setIndex(index)}
          >
            {URL}
          </option>
        ))}
      </select>

      <input name="ghostApi" type="hidden" value={ghostData[index].ghostApi} />
    </>
  );
}

function Wordpress({ wordpressData }: { wordpressData: WordpressBlogInfo[] }) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <input
        name="username"
        type="hidden"
        value={wordpressData[index].username}
      />

      <input
        name="password"
        type="hidden"
        value={wordpressData[index].password}
      />
      <select name="url" className="p-2 rounded-md outline-none text-black">
        {wordpressData.map(({ URL }: { URL: string }, index: number) => (
          <option
            key={index}
            value={URL}
            className="p-2 rounded-md outline-none text-black"
            onClick={() => setIndex(index)}
          >
            {URL}
          </option>
        ))}
      </select>
    </>
  );
}

export default PublishBlogModal;
