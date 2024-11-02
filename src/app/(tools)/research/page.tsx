"use client";

import ResearchList from "@/components/tools/ResearchList";
import ResearchSidebar from "@/components/tools/ResearchSidebar";
import { DocumentInfo } from "@/types/type";
import { useState } from "react";

const DEFAULT_DOCUMENT: DocumentInfo = {
  id: "0",
  name: "",
  words: 0,
  modified: "",
  favourite: false,
};

export default function Research() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorDocData, seEditorDocData] =
    useState<DocumentInfo>(DEFAULT_DOCUMENT);

  const toggleShowEditor = () => setShowEditor(!showEditor);

  const handleDocumentSubmit = (data: DocumentInfo) => {
    toggleShowEditor();
    seEditorDocData(data);
  };

  return (
    <>
      <ResearchSidebar handleDocumentSubmit={handleDocumentSubmit} />
      <div className="flex-1">
        <ResearchList
          showEditor={showEditor}
          toggleShowEditor={toggleShowEditor}
          editorDocData={editorDocData}
          seEditorDocData={seEditorDocData}
        />
      </div>
    </>
  );
}
