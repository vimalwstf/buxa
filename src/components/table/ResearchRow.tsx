import { formatDate, parseHtml } from "@/lib/utils";
import Td from "./Td";
import { FaStar } from "react-icons/fa6";
import { FaFileAlt, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { Research } from "@/app/(tools)/research/page";
import { useState } from "react";
import Th from "./Th";

export default function ResearchRow({
  docData,
  onClick,
  handleDeleteData,
  handleFavouriteUpdate,
}: {
  docData: Research;
  onClick: (i: number) => void;
  handleDeleteData: (id: string, index: number) => void;
  handleFavouriteUpdate: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    return (index: number) => {
      handleDeleteData(id, index);
    };
  };

  return (
    <>
      <tr
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-200 relative cursor-pointer"
      >
        <Td className="flex !whitespace-normal items-center">
          {/* <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" /> */}
          <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
            {docData.id}
          </span>
        </Td>
        <Td className="text-center text-white">{docData.content.length}</Td>
        <Td className="text-center !max-w-fit">
          {formatDate(docData.updatedAt)}
        </Td>
        <Td className="text-center">
          <button
            className=""
            onClick={(e) => {
              e.stopPropagation();
              handleFavouriteUpdate(docData.id);
            }}
          >
            {docData.isFavorite ? (
              <FaStar size={18} className="text-primary-green" />
            ) : (
              <FaRegStar size={18} className="text-white" />
            )}
          </button>
        </Td>
        {isOpen && (
          <ContentTable
            content={docData.content}
            onclick={onClick}
            handleDelete={handleDelete(docData.id)}
          />
        )}
      </tr>
    </>
  );
}

function ContentTable({
  content,
  onclick,
  handleDelete,
}: {
  content: string[];
  onclick: (i: number) => void;
  handleDelete: (index: number) => void;
}) {
  return (
    <table className="absolute top-8 z-40 left-0 w-full h-fit bg-primary-light border rounded-md border-gray-50">
      <thead className="bg-gray-50">
        <tr>
          <Th className="text-left pl-4 sm:pl-10">Content</Th>
          <Th className="text-center">Delete</Th>
        </tr>
      </thead>
      <tbody>
        {content.map((str, index) => (
          <tr key={index} onClick={() => onclick(index)}>
            <Td className="flex !whitespace-normal items-center">
              <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" />
              <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
                {parseHtml(str)}
              </span>
            </Td>
            <Td>
              <button
                className="flex items-center justify-center w-full h-full gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                <FaTrashAlt size={18} className="text-red-500" />
                <span>Delete</span>
              </button>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
