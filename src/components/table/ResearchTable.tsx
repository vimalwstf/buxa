import Pagination, { usePagination } from "@/components/table/Pagination";
import Th from "@/components/table/Th";
import { CgFileAdd } from "react-icons/cg";
import ResearchRow from "./ResearchRow";
import { Research } from "@/app/(tools)/research/page";

interface TableProps {
  documents: Research[];
  setDocData: (data: Research) => void;
  toggleShowEditor: () => void;
  setSelectedDoc: (n: number) => void;
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string, index: number) => void;
}

export default function ResearchTable({
  documents,
  setDocData,
  toggleShowEditor,
  setSelectedDoc,
  handleFavouriteUpdate,
  handleDeleteData,
}: TableProps) {
  const { currentPage, setCurrentPage, firstIndex, lastIndex, totalPages } =
    usePagination(documents.length);
  const currentDocuments = documents.slice(firstIndex, lastIndex);

  const openEditor = (doc: Research, index: number) => {
    toggleShowEditor();
    setDocData(doc);
    setSelectedDoc(index);
  };

  return (
    <>
      <div className="element flex-1 p-4 text-white overflow-y-scroll w-full rounded-md bg-primary-light">
        {currentDocuments.length === 0 ? (
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
                <Th className="text-left pl-4 sm:pl-10">Topic</Th>
                <Th className="text-center">Documents</Th>
                <Th className="text-center">Modified</Th>
                {/* <Th className="text-center">Favourite</Th> */}
              </tr>
            </thead>
            <tbody className="divide-gray-200">
              {currentDocuments.map((data, i) => (
                <ResearchRow
                  key={i}
                  docData={data}
                  onClick={(i: number) => openEditor(data, i)}
                  handleDeleteData={handleDeleteData}
                  handleFavouriteUpdate={handleFavouriteUpdate}
                />
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
