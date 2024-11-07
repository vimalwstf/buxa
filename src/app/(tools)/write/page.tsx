"use client";

import { useState } from "react";
import WriteList from "@/components/tools/WriteList";
import WriteSidebar from "@/components/tools/WriteSidebar";
import { DocumentInfo } from "@/types/type";

// import { useAuth } from "@/hooks/useAuth";


const DEFAULT_DOCUMENT: DocumentInfo = {
  id: "0",
  name: "",
  words: 0,
  modified: "",
  favourite: false,
};

export default function Write() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorDocData, seEditorDocData] =
    useState<DocumentInfo>(DEFAULT_DOCUMENT);

  const toggleShowEditor = () => setShowEditor(!showEditor);

  const handleDocumentSubmit = (data: DocumentInfo) => {
    toggleShowEditor();
    seEditorDocData(data);
  };

  // const { isLoading, checkUser } = useAuth();
  // useEffect(() => {
  //   checkUser();
  // }, []);


  return (
    <>
      <WriteSidebar handleDocumentSubmit={handleDocumentSubmit} />
      <div className="w-full md:w-[70%] lg:w-[75%]">
        <WriteList
          showEditor={showEditor}
          toggleShowEditor={toggleShowEditor}
          editorDocData={editorDocData}
          seEditorDocData={seEditorDocData}
        />
      </div>
    </>
  );
}
