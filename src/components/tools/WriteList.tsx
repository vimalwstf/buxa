// import useFetchWriterDocuments from "@/hooks/useFetchWriteDocuments";
import { parseHtml } from "@/lib/utils";
import { DocumentInfo } from "@/types/type";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
const MyEditor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
});
import DocumentsTable from "../table/DocumentsTable";
import LoadingDocs from "../table/LoadingDocs";
import ListButton from "../ui/ListButton";
import FavouritesButton from "../ui/FavouritesButton";
import NewButton from "../ui/NewButton";
import SaveButton from "../ui/SaveButton";
import dynamic from "next/dynamic";
import useLocalStorage from "@/hooks/useLocalStorage";
import Publish from "./Publish";
import useFetchWriterDocuments from "@/hooks/useFetchWriteDocuments";

export default function WriteList({
  newAIDoc,
  showEditor,
  toggleShowEditor,
  editorDocData,
  seEditorDocData,
}: {
  newAIDoc: boolean;
  showEditor: boolean;
  toggleShowEditor: () => void;
  editorDocData: DocumentInfo;
  seEditorDocData: (data: DocumentInfo) => void;
}) {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const { isLoading } = useFetchWriterDocuments(setDocuments);

  const handleFavouriteUpdate = async (id: string) => {
    const updatedDocuments = [...documents];
    const index = updatedDocuments.findIndex((doc) => doc.id === id);
    updatedDocuments[index].favourite = !updatedDocuments[index].favourite;
    setDocuments(updatedDocuments);
  };

  const handleDeleteData = async (id: string) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocuments);
  };

  const handleEditorSubmit = async () => {
    const text = parseHtml(editorDocData.name);
    if (text.trim() === "") {
      enqueueSnackbar("Document is empty!", {
        variant: "error",
      });
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${
      editorDocData?.id || 0
    }`;

    if (accessToken && editorDocData) {
      try {
        const res = await axios.post(
          url,
          {
            content: editorDocData.name,
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
        enqueueSnackbar("Failed to save Document", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 ">
      {showEditor ? (
        <>
          <div className="flex justify-between items-baseline">
            <ListButton handleClick={toggleShowEditor} label="Document List" />
            <div className="flex gap-2">
              {newAIDoc && <Publish docData={editorDocData} />}
              <SaveButton handleClick={handleEditorSubmit} />
            </div>
          </div>
          <MyEditor
            value={editorDocData.name}
            onChange={(content: string) =>
              seEditorDocData({ ...editorDocData, name: content })
            }
          />
        </>
      ) : (
        <>
          <div className="flex items-end justify-between">
            <h2 className="sm:text-2xl text-lg font-bold text-white">
              Document List
            </h2>
            <div className="flex gap-4">
              <FavouritesButton />
              <NewButton
                label="New Document"
                createNewDocument={toggleShowEditor}
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingDocs />
          ) : (
            <DocumentsTable
              documents={documents}
              seEditorDocData={seEditorDocData}
              toggleShowEditor={toggleShowEditor}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          )}
        </>
      )}
    </div>
  );
}
