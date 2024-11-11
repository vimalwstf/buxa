"use client";

import ResearchList from "@/components/tools/ResearchList";
import ResearchSidebar from "@/components/tools/ResearchSidebar";
import { useState } from "react";

export type Research = {
  id: string;
  content: string[];
  isFavorite: boolean;
  updatedAt: string;
};

const DefaultResearch: Research = {
  id: "0",
  content: [""],
  isFavorite: false,
  updatedAt: "",
};
export { DefaultResearch };

export default function Research() {
  const [showEditor, setShowEditor] = useState(false);
  const [docData, setDocData] = useState<Research>(DefaultResearch);

  const handleDocumentSubmit = (data: Research) => {
    setShowEditor(true);
    setDocData(data);
  };

  return (
    <>
      <ResearchSidebar
        docData={docData}
        handleDocumentSubmit={handleDocumentSubmit}
      />
      <div className="flex-1">
        <ResearchList
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          docData={docData}
          setDocData={setDocData}
        />
      </div>
    </>
  );
}
