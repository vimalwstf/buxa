import useFetchWriterDocuments from "@/hooks/useFetchWriteDocuments";
import { parseHtml } from "@/lib/utils";
import { DocumentInfo } from "@/types/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
const MyEditor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
});
import LoadingDocs from "../table/LoadingDocs";
import ListButton from "../ui/ListButton";
import FavouritesButton from "../ui/FavouritesButton";
import NewButton from "../ui/NewButton";
import SaveButton from "../ui/SaveButton";
import dynamic from "next/dynamic";
import ResearchTable from "../table/ResearchTable";
import { Research } from "@/app/(tools)/research/page";

export default function ResearchList({
  showEditor,
  toggleShowEditor,
  docData,
  setDocData,
}: {
  showEditor: boolean;
  toggleShowEditor: () => void;
  docData: Research;
  setDocData: (data: Research) => void;
}) {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const { isLoading } = useFetchWriterDocuments(setDocuments);
  const [selectedDoc, setSelectedDoc] = useState(0);

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const handleFavouriteUpdate = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${id}`;

    if (accessToken) {
      try {
        const res = await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status === 200) {
          const updatedDocuments = [...documents];
          const index = updatedDocuments.findIndex((doc) => doc.id === id);
          updatedDocuments[index].favourite =
            !updatedDocuments[index].favourite;
          setDocuments(updatedDocuments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteData = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${id}`;

    if (accessToken) {
      try {
        const res = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 200) {
          const updatedDocuments = documents.filter((doc) => doc.id !== id);
          setDocuments(updatedDocuments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditorSubmit = async () => {
    const text = parseHtml(docData.name);
    if (text.trim() === "") {
      enqueueSnackbar("Document is empty!", {
        variant: "error",
      });
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${docData?.id}`;

    if (accessToken && docData) {
      try {
        const res = await axios.post(
          url,
          {
            content: docData.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (res.status === 200) {
          const { id, content, wordCount, updatedAt, isFavorite } =
            res.data.data;

          setDocuments((prev) => [
            {
              id,
              name: content,
              words: wordCount,
              modified: updatedAt,
              favourite: isFavorite,
            },
            ...prev,
          ]);
          toggleShowEditor();
          enqueueSnackbar("Document saved successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Failed to save document", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 1000,
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 ">
      {showEditor ? (
        <>
          <div className="flex justify-between mb-4 items-baseline">
            <ListButton handleClick={toggleShowEditor} label="Research List" />
            <SaveButton handleClick={handleEditorSubmit} />
          </div>
          {docData.map((doc, index) => {
            console.log(doc);
            // <button
            //   key={index}
            //   onClick={() => setSelectedDoc(index)}
            //   className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            // >
            //   Version {index + 1}
            // </button>
          })}
          <MyEditor
            value={docData[selectedDoc]}
            onChange={(content: string) => {
              const updatedDocs = [...docData];
              updatedDocs[selectedDoc] = content;
              setDocData(updatedDocs);
            }}
          />
        </>
      ) : (
        <>
          <div className="flex items-end justify-between">
            <h2 className="sm:text-2xl text-lg font-bold text-white">
              Research List
            </h2>
            <div className="flex gap-4">
              <FavouritesButton />
              <NewButton
                label="New Research"
                createNewDocument={toggleShowEditor}
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingDocs />
          ) : (
            ""
            // <ResearchTable
            //   documents={documents}
            //   setDocData={setDocData}
            //   toggleShowEditor={toggleShowEditor}
            //   handleFavouriteUpdate={handleFavouriteUpdate}
            //   handleDeleteData={handleDeleteData}
            // />
          )}
        </>
      )}
    </div>
  );
}
