"use client";

import { DocumentInfo } from "@/types/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import MyEditor from "../editor/Editor";
import DocumentsTable from "../table/DocumentsTable";
import FavouritesButton from "../ui/FavouritesButton";
import NewDocButton from "../ui/NewDocButton";
import { parseHtml } from "@/lib/utils";
import LoadingDocs from "../table/LoadingDocs";
import DocListButton from "../ui/DocListButton";
import DocSaveButton from "../ui/DocSaveButton";
import useFetchWriterDocuments from "@/hooks/useFetchWriteDocuments";

const DEFAULT_DOCUMENT: DocumentInfo = {
  id: "",
  name: "",
  words: 0,
  modified: "",
  favourite: false,
};

export default function WriteList() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [favouritesON, setFavouritesON] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editorDocData, seEditorDocData] =
    useState<DocumentInfo>(DEFAULT_DOCUMENT);

  const { isLoading } = useFetchWriterDocuments(setDocuments);

  const filteredDocuments = favouritesON
    ? documents.filter((doc) => doc.favourite)
    : documents;

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const toggleShowEditor = () => {
    setShowEditor(!showEditor);
  };

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
          const updatedDocuments = [...documents];
          const index = updatedDocuments.findIndex(
            (doc) => doc.id === editorDocData.id,
          );
          updatedDocuments[index] = editorDocData;
          setDocuments(updatedDocuments);
          setShowEditor(false);
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
            <DocListButton handleClick={toggleShowEditor} />
            <DocSaveButton handleClick={handleEditorSubmit} />
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
              Write List
            </h2>
            <div className="flex gap-4">
              <FavouritesButton
                favouritesON={favouritesON}
                setFavouritesON={setFavouritesON}
              />
              <NewDocButton createNewDocument={toggleShowEditor} />
            </div>
          </div>

          {isLoading ? (
            <LoadingDocs />
          ) : (
            <DocumentsTable
              documents={filteredDocuments}
              seEditorDocData={seEditorDocData}
              setShowEditor={setShowEditor}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          )}
        </>
      )}
    </div>
  );
}
