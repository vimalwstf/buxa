"use client";

import { useState } from "react";
import WriteList from "@/components/tools/WriteList";
import WriteSidebar from "@/components/tools/WriteSidebar";
import { DocumentInfo } from "@/types/type";
import { DefaultDocument } from "@/lib/config";

export default function Write() {
  const [showEditor, setShowEditor] = useState(false);
  const [newAIDoc, setNewAIDoc] = useState(false);

  const [editorDocData, seEditorDocData] =
    useState<DocumentInfo>(DefaultDocument);

  const toggleShowEditor = () => setShowEditor(!showEditor);

  const handleDocumentSubmit = (data: DocumentInfo) => {
    if (editorDocData.id === "0") {
      setNewAIDoc(true);
    }
    toggleShowEditor();
    seEditorDocData(data);
  };

  return (
    <>
      <WriteSidebar handleDocumentSubmit={handleDocumentSubmit} />
      <div className="w-full md:w-[70%] lg:w-[75%]">
        <WriteList
          newAIDoc={newAIDoc}
          showEditor={showEditor}
          toggleShowEditor={toggleShowEditor}
          editorDocData={editorDocData}
          seEditorDocData={seEditorDocData}
        />
      </div>
    </>
  );
}
