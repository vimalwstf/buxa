import Pagination, { usePagination } from "@/components/table/Pagination";
import Td from "@/components/table/Td";
import Th from "@/components/table/Th";
import { formatDate, parseHtml } from "@/lib/utils";
import { DocumentInfo } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CgFileAdd } from "react-icons/cg";
import { FaFileAlt, FaRegStar, FaStar } from "react-icons/fa";
import OptionsModal from "./OptionsModal";

interface TableProps {
  documents: DocumentInfo[];
  toggleShowEditor: () => void;
  seEditorDocData: (doc: DocumentInfo) => void;
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
}

export default function DocumentsTable({
  documents,
  toggleShowEditor,
  seEditorDocData,
  handleFavouriteUpdate,
  handleDeleteData,
}: TableProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const favouritesON = params.get("favourites") === "true";

  const filteredDocuments = favouritesON
    ? documents.filter((doc) => doc.favourite)
    : documents;

  const { currentPage, setCurrentPage, firstIndex, lastIndex, totalPages } =
    usePagination(filteredDocuments.length);
  const currentDocuments = filteredDocuments.slice(firstIndex, lastIndex);

  const openEditor = (doc: DocumentInfo) => {
    toggleShowEditor();
    seEditorDocData(doc);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [favouritesON, setCurrentPage]);

  return (
    <>
      <div className="element flex-1 p-4 text-white overflow-y-scroll w-full rounded-md bg-primary-light">
        {filteredDocuments.length === 0 ? (
          <div className="w-3/5 mx-auto h-full flex flex-col items-center justify-center gap-2 text-center">
            <h4 className="text-white text-xl font-bold">No Documents Found</h4>
            <p className="text-white text-wrap">
              You can create a new document by clicking the button below.
            </p>
            <button
              className="text-black px-4 py-2 text-sm  rounded-md shadow-md bg-primary-green "
              onClick={toggleShowEditor}
            >
              <CgFileAdd size={22} className="inline sm:mr-2" />
              <span className="sr-only sm:not-sr-only ">New Document</span>
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <Th className="text-left pl-4 sm:pl-10">Name</Th>
                <Th className="text-center">Words</Th>
                <Th className="text-center">Modified</Th>
              </tr>
            </thead>
            <tbody className="divide-gray-200">
              {currentDocuments.map((item, i) => (
                <tr key={i} className="hover:bg-gray-200 cursor-pointer">
                  <Td
                    onClick={() => openEditor(item)}
                    className="flex !whitespace-normal items-center"
                  >
                    <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" />
                    <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
                      {parseHtml(item.name)}
                    </span>
                  </Td>
                  <Td className="text-center text-white">{item.words}</Td>
                  <Td className="text-center">
                    <span className="hidden sm:inline">
                      {formatDate(item?.modified)}
                    </span>
                    <span className="sm:hidden">
                      {formatDate(item?.modified).slice(0, 10)}...
                    </span>
                  </Td>
                  <Td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavouriteUpdate(item.id);
                      }}
                    >
                      {item.favourite ? (
                        <FaStar size={18} className="text-primary-green" />
                      ) : (
                        <FaRegStar size={18} className="text-white" />
                      )}
                    </button>
                  </Td>
                  <Td>
                    <OptionsModal
                      handleDeleteData={handleDeleteData}
                      id={item.id}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
