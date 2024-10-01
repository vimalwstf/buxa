"use client";

import { useState } from "react";
import Table from "./Table";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import Editor from "./Editor";
import { FaArrowLeft } from "react-icons/fa6";

function DocumentList() {
  const [favouritesON, setFavouritesON] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const toggleEditor = () => {
    setOpenEditor((prev) => !prev);
  };

  return (
    <div className="m-2 text-gray-600">
      <div className="flex items-center justify-between mb-4">
        {openEditor ? (
          <h2 className="text-2xl font-bold flex items-center gap-2 cursor-pointer">
            <FaArrowLeft onClick={toggleEditor} />
            New Document
          </h2>
        ) : (
          <h2 className="text-2xl font-bold">Document List</h2>
        )}
        <div className="flex gap-4">
          <button
            onClick={() => setFavouritesON(!favouritesON)}
            className={`${
              favouritesON ? "bg-[#474bff]" : "bg-gray-600"
            } text-white px-4 py-2 rounded-md shadow-md`}
          >
            <FaStar className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">Favourites</span>
          </button>
          <button
            onClick={toggleEditor}
            style={{ backgroundColor: "#474bff" }}
            className="text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-500"
          >
            <CgFileAdd size={22} className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">New Document</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {!openEditor && (
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <Table favourites={favouritesON} />
            </div>
          </div>
        )}
      </div>
      {openEditor && (
        <div>
          <Editor />
        </div>
      )}
    </div>
  );
}

export default DocumentList;
