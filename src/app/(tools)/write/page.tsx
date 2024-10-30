"use client";

import { useState } from "react";
import WriteList from "@/components/tools/WriteList";
import WriteSidebar from "@/components/tools/WriteSidebar";
import { DocumentInfo } from "@/types/type";

const DEFAULT_DOCUMENT: DocumentInfo = {
  id: "",
  name: "",
  words: 0,
  modified: "",
  favourite: false,
};

export default function Alert() {
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
      <WriteSidebar handleDocumentSubmit={handleDocumentSubmit} />
      <div className="flex-1">
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
