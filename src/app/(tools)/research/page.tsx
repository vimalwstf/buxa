"use client";

import ResearchList from "@/components/tools/ResearchList";
import ResearchSidebar from "@/components/tools/ResearchSidebar";
// import { DocumentInfo } from "@/types/type";
import { useState } from "react";

export type Research = [
  [
    {
      id: string;
      content: string[];
      isFavorite: boolean;
      updatedAt: string;
    },
  ],
];

export default function Research() {
  const [showEditor, setShowEditor] = useState(false);
  const [docData, setDocData] = useState<Research>([
    [
      {
        id: "",
        content: [""],
        isFavorite: false,
        updatedAt: "",
      },
    ],
  ]);

  const toggleShowEditor = () => setShowEditor(!showEditor);

  const handleDocumentSubmit = (data: Research) => {
    toggleShowEditor();
    setDocData(data);
  };

  return (
    <>
      <ResearchSidebar handleDocumentSubmit={handleDocumentSubmit} />
      <div className="flex-1">
        <ResearchList
          showEditor={showEditor}
          toggleShowEditor={toggleShowEditor}
          docData={docData}
          setDocData={setDocData}
        />
      </div>
    </>
  );
}
