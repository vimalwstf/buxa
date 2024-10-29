"use client";

import DocumentList from "./DocumentList";
import Sidebar from "./sidebar/WriteSidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./editor/Editor";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { DocumentInfo } from "@/types/type";
import useFetchWriteDocuments from "@/hooks/useFetchWriteDocuments";
const Write = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [editorText, setEditorText] = useState<DocumentInfo>({
    id: "",
    name: "",
    words: 0,
    modified: "",
    favourite: false,
  });
  const [showEditor, setShowEditor] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  //fetch all write documents
  useFetchWriteDocuments(setDocuments);
  const handleFavouriteUpdate = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${id}`;

    if (accessToken) {
      try {
        const res = await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(res);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDocumentSubmit = (data: DocumentInfo) => {
    setDocuments((prevDocuments) => [data, ...prevDocuments]);
    setEditorText(data);
    setShowEditor(true);
    setIsSidebarOpen(false);
  };

  const handleManualDocumentSave = (data: DocumentInfo) => {
    setDocuments((prevDocuments) => [data, ...prevDocuments]);
  };

  const handleEditorSubmit = async () => {
    const htmlString = editorText.name;
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    const text = html.body.textContent || "";
    if (text.trim() === "") {
      enqueueSnackbar("Document is empty!", {
        variant: "error",
      });
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${editorText?.id}`;
    if (accessToken) {
      try {
        const res = await axios.post(
          url,
          {
            content: editorText.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (res.status === 200) {
          const updatedDocuments = [...documents];
          const index = updatedDocuments.findIndex(
            (doc) => doc.id === editorText.id
          );
          updatedDocuments[index] = editorText;
          setDocuments(updatedDocuments);
          setShowEditor(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditorTextChange = (content: string) => {
    setEditorText({ ...editorText, name: content });
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main className="w-full p-4 ">
      <div className="flex gap-4">
        <div
          className={`fixed inset-0 z-40 transition-transform transform md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-300`}
        >
          <div className="relative w-full h-full bg-blue shadow-lg">
            <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
          </div>
        </div>

        <div
          className={`w-[20%] max-w-[25%] overflow-hidden hidden md:block ${
            showEditor && "flex-[0.4]"
          }`}
        >
          <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
        </div>

        {showEditor ? (
          <div className="flex-1">
            <div className="flex justify-between mb-4 items-baseline">
              <div>
                <button className="sm:text-2xl text-lg  flex items-center gap-2 text-white font-bold">
                  <FaArrowLeftLong
                    className="cursor-pointer "
                    onClick={() => setShowEditor(false)}
                  />
                  Document List
                </button>
              </div>
              <button
                className="text-black flex items-center gap-2 top-10 bg-primary-green  px-4 py-2 text-sm rounded-md shadow-md"
                onClick={handleEditorSubmit}
              >
                <IoMdDocument />
                <span> Save</span>
              </button>
            </div>
            <Editor
              value={editorText?.name}
              onChange={handleEditorTextChange}
            />
          </div>
        ) : (
          <div className="flex-grow">
            <DocumentList
              handleManualDocumentSave={handleManualDocumentSave}
              setEditorText={setEditorText}
              setShowEditor={setShowEditor}
              documents={documents}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-2 right-0 m-4 z-50">
        <div
          className="bg-secondary-disabled rounded-lg shadow-lg p-3 cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <CiPen className="text-2xl text-gray-800" />
        </div>
      </div>
    </main>
  );
};

export default Write;
