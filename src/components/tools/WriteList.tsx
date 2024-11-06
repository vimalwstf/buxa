import useFetchWriterDocuments from "@/hooks/useFetchWriteDocuments";
import { parseHtml } from "@/lib/utils";
import { DataObject, DocumentInfo } from "@/types/type";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
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

export default function WriteList({
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
  const [isLoading, setIsLoading] = useState(true);
  // const { isLoading } = useFetchWriterDocuments(setDocuments);

  
  // const loggedIn = localStorage.getItem("");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const accessToken = parsedUser?.accessToken;


  useEffect(() => {
    const fetchDocuments = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            }
          );
          if (response?.data?.status) {
            const data: DocumentInfo[] = response.data.data.map(
              (doc: DataObject) => {
                return {
                  id: doc.id,
                  name: doc.content,
                  words: doc.words,
                  modified: doc.updatedAt,
                  favourite: doc.isFavorite,
                };
              }
            );
            data.sort(
              (a, b) =>
                new Date(b.modified).getTime() - new Date(a.modified).getTime()
            );
            setDocuments(data);
          }
        } catch (error) {
          console.log("document fetch", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDocuments();
  }, [accessToken, setDocuments]);

  // const { data: session } = useSession();
  // const accessToken = session?.user?.accessToken;

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
          }
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
