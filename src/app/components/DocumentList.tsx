"use client";

import { useState } from "react";
import Table from "./Table";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import Editor from "./Editor";

function DocumentList() {
  const [favouritesON, setfavouritesON] = useState(false);

  return (
    <div className="m-2 text-gray-600">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Document List</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setfavouritesON(!favouritesON)}
            className={`${
              favouritesON ? "bg-[#474bff]" : "bg-gray-600"
            } text-white px-4 py-2 rounded-md shadow-md`}
          >
            <FaStar className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">Favourites</span>
          </button>
          <button
            style={{ backgroundColor: "#474bff" }}
            className="text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-500"
          >
            <CgFileAdd size={22} className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">New Document</span>
          </button>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <Table favourites={favouritesON} />
          </div>
        </div>
      </div> */}
      <div>
        <Editor/>
      </div>
    </div>
  );
}

export default DocumentList;