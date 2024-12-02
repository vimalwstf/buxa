import useClickOutside from "@/hooks/useClickOutisde";
import useLocalStorage from "@/hooks/useLocalStorage";
import { snackBar } from "@/lib/utils";
import { BlogAPIInfo } from "@/types/type";
import axios from "axios";
import { useRef, useState } from "react";
// import { CgAdd } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";

function BlogDashboardForm() {
  const [selected, setSelected] = useState<"ghost" | "wordpress">("ghost");

  const [modalOpen, setModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { value: user } = useLocalStorage("user", {
    accessToken: "",
  });
  const accessToken = user?.accessToken;

  const { value: apiData, setValue: setApiData } = useLocalStorage<BlogAPIInfo>(
    "apiData",
    {
      ghostBlogs: [],
      wordpressBlogs: [],
    }
  );

  const closeModal = () => {
    if (!isPublishing) {
      setModalOpen(false);
    }
  };
  useClickOutside(modalRef, closeModal);

  const handleSubmit = async (formData: FormData) => {
    // if (accessToken) {
    // setIsPublishing(true);
    const metadata = {
      blogType: selected,
      blogSite:
        selected === "ghost"
          ? {
              ghostApi: formData.get("api-key") as string,
              ghostURL: formData.get("url") as string,
            }
          : {
              username: formData.get("username") as string,
              password: formData.get("password") as string,
              URL: formData.get("url") as string,
            },
    };
    console.log(metadata);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/blog-api`,
        { data: metadata },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response?.status === 200) {
        setModalOpen(false);
        const newApiData = apiData ?? { ghostBlogs: [], wordpressBlogs: [] };
        if (selected === "ghost") {
          newApiData.ghostBlogs = [
            ...newApiData?.ghostBlogs,
            {
              URL: formData.get("url") as string,
              ghostApi: formData.get("api-key") as string,
            },
          ];
        } else if (selected === "wordpress") {
          newApiData.wordpressBlogs = [
            ...newApiData?.wordpressBlogs,
            {
              URL: formData.get("url") as string,
              username: formData.get("username") as string,
              password: formData.get("password") as string,
            },
          ];
        }

        console.log("------", newApiData);

        setApiData(newApiData);
      }
    } catch (err) {
      const error = err as Error;
      snackBar("Failed to add blog data: " + error.message, "error");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="bg-primary-green text-black px-4 py-2 rounded-md font-medium flex gap-1 items-center"
        onClick={() => setModalOpen(true)}
      >
        <IoMdAdd size={22} />{" "}
        <span className="hidden sm:block">Add Details</span>
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
                  Enter your blog site details
                </h1>
              </div>

              <h3 className="text-text-light">Select a blogging platform</h3>
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
                action={handleSubmit}
                className="w-full h-full flex gap-4 flex-col cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  {selected === "ghost" && <Ghost />}
                  {selected === "wordpress" && <Wordpress />}
                </div>

                <button
                  type="submit"
                  className="bg-primary-green text-black p-2 rounded-md hover:scale-105 duration-200"
                  disabled={isPublishing}
                >
                  {isPublishing ? "Saving..." : "Save Details"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Ghost() {
  return (
    <>
      <input
        required
        name="api-key"
        type="text"
        placeholder="Enter api key"
        className="p-2 rounded-md outline-none text-black"
      />
      <input
        required
        name="url"
        type="url"
        placeholder="Enter your url"
        className="p-2 rounded-md outline-none text-black"
      />
    </>
  );
}

function Wordpress() {
  return (
    <>
      <input
        required
        name="username"
        type="text"
        placeholder="Enter username"
        className="p-2 rounded-md outline-none text-black"
      />
      <input
        required
        name="password"
        type="text"
        placeholder="Enter password"
        className="p-2 rounded-md outline-none text-black"
      />
      <input
        required
        name="url"
        type="url"
        placeholder="Enter your url"
        className="p-2 rounded-md outline-none text-black"
      />
    </>
  );
}

export default BlogDashboardForm;
