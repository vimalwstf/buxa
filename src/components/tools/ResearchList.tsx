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
import DocumentsTable from "../table/DocumentsTable";
import LoadingDocs from "../table/LoadingDocs";
import ListButton from "../ui/ListButton";
import FavouritesButton from "../ui/FavouritesButton";
import NewButton from "../ui/NewButton";
import SaveButton from "../ui/SaveButton";
import dynamic from "next/dynamic";

export default function ResearchList({
  showEditor,
  toggleShowEditor,
  editorDocData,
  seEditorDocData,
}: {
  showEditor: boolean;
  toggleShowEditor: () => void;
  editorDocData: DocumentInfo;
  seEditorDocData: (data: DocumentInfo) => void;
}) {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [favouritesON, setFavouritesON] = useState(false);

  const { isLoading } = useFetchWriterDocuments(setDocuments);

  const filteredDocuments = favouritesON
    ? documents.filter((doc) => doc.favourite)
    : documents;

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
    const text = parseHtml(editorDocData.name);
    if (text.trim() === "") {
      enqueueSnackbar("Document is empty!", {
        variant: "error",
      });
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${editorDocData?.id}`;

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
          enqueueSnackbar("Document saved successfully!", {
            variant: "success",
          });
        }
      } catch (error) {
        console.log(error);
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
              Research List
            </h2>
            <div className="flex gap-4">
              <FavouritesButton
                favouritesON={favouritesON}
                setFavouritesON={setFavouritesON}
              />
              <NewButton
                label="New Research"
                createNewDocument={toggleShowEditor}
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingDocs />
          ) : (
            <DocumentsTable
              documents={filteredDocuments}
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
