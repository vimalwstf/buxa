import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import dynamic from "next/dynamic";
import useFetchResearchDocuments from "@/hooks/useFetchResearchDocuments";
import useLocalStorage from "@/hooks/useLocalStorage";
import LoadingDocs from "../table/LoadingDocs";
import ResearchTable from "../table/ResearchTable";
import ListButton from "../ui/ListButton";
import SaveButton from "../ui/SaveButton";
import FavouritesButton from "../ui/FavouritesButton";
import NewButton from "../ui/NewButton";
import DeleteButton from "../ui/DeleteButton";
import { DefaultResearch, Research } from "@/app/(tools)/research/page";

const MyEditor = dynamic(() => import("../editor/Editor"), { ssr: false });

export default function ResearchList({
  showEditor,
  setShowEditor,
  docData,
  setDocData,
}: {
  showEditor: boolean;
  setShowEditor: (b: boolean) => void;
  docData: Research;
  setDocData: (data: Research) => void;
}) {
  const [documents, setDocuments] = useState<Research[]>([]);
  const [selectedDoc, setSelectedDoc] = useState(0);
  const { isLoading } = useFetchResearchDocuments(setDocuments);
  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const handleFavouriteUpdate = (id: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc,
      ),
    );
  };

  const handleDeleteData = (id: string, index: number) => {
    setDocuments((prevDocs) => {
      const docIndex = prevDocs.findIndex((doc) => doc.id === id);
      if (docIndex === -1) return prevDocs;
      if (index === -1) {
        return prevDocs.filter((doc) => doc.id !== id);
      }

      const updatedDocs = [...prevDocs];
      const doc = updatedDocs[docIndex];

      if (doc.content.length > 1) {
        doc.content.splice(index, 1);
      } else {
        gotoList();
        updatedDocs.splice(docIndex, 1);
      }

      return updatedDocs;
    });
  };

  const handleEditorSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/research/${docData.id}`;

    if (accessToken && docData) {
      try {
        const res = await axios.put(
          url,
          { content: docData.content },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (res.status === 200) {
          setShowEditor(false);
          setDocData(DefaultResearch);
          enqueueSnackbar("Document saved successfully", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to save document", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 1000,
        });
      }
    }
  };

  function gotoList() {
    setShowEditor(false);
    setDocData(DefaultResearch);
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4">
      {showEditor ? (
        <>
          <div className="flex justify-between mb-4 items-baseline">
            <ListButton handleClick={gotoList} label="Research List" />
            <SaveButton handleClick={handleEditorSubmit} />
          </div>

          <div className="element flex gap-2 overflow-x-auto">
            {docData.content.map((doc: string, index: number) => (
              <span
                key={index}
                onClick={() => setSelectedDoc(index)}
                className="bg-primary-light px-2 py-1 flex justify-center items-center gap-2 rounded-md border cursor-pointer whitespace-nowrap"
              >
                Variant {index + 1}
                <DeleteButton
                  id={docData.id}
                  index={index}
                  onDelete={() => handleDeleteData(docData.id, index)}
                />
              </span>
            ))}
          </div>

          {MyEditor ? (
            <MyEditor
              value={docData.content[selectedDoc]}
              onChange={(content: string) => {
                const updatedContent = [...docData.content];
                updatedContent[selectedDoc] = content;
                setDocData({ ...docData, content: updatedContent });
              }}
            />
          ) : (
            <div>Loading...</div>
          )}
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
                createNewDocument={() => setShowEditor(true)}
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingDocs />
          ) : (
            <ResearchTable
              documents={documents}
              setSelectedDoc={setSelectedDoc}
              setDocData={setDocData}
              toggleShowEditor={() => setShowEditor(true)}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          )}
        </>
      )}
    </div>
  );
}
