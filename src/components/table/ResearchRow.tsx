// import { formatDate, parseHtml } from "@/lib/utils";
// import Td from "./Td";
// import { FaFileAlt } from "react-icons/fa";
// import { Research } from "@/app/(tools)/research/page";
// import { useRef, useState } from "react";
// import Th from "./Th";
// import useClickOutside from "@/hooks/useClickOutisde";
// import ToggleFavouriteButton from "../ui/ToggleFavouriteButton";
// import DeleteButton from "../ui/DeleteButton";

// export default function ResearchRow({
//   docData,
//   onClick,
//   handleDeleteData,
//   handleFavouriteUpdate,
// }: {
//   docData: Research;
//   onClick: (i: number) => void;
//   handleDeleteData: (id: string, index: number) => void;
//   handleFavouriteUpdate: (id: string) => void;
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const tableRef = useRef<HTMLTableRowElement>(null);

//   const closeTable = () => {
//     setIsOpen(false);
//   };
//   useClickOutside(tableRef, closeTable);

//   return (
//     <tr
//       ref={tableRef}
//       onClick={() => setIsOpen(!isOpen)}
//       className={` hover:bg-gray-200 relative cursor-pointer`}
//     >
//       <Td className="flex !whitespace-normal items-center">
//         {/* <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" /> */}
//         <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
//           {docData.id}
//         </span>
//       </Td>
//       <Td className="text-center text-white">{docData.content.length}</Td>
//       <Td className="text-center !max-w-fit">
//         {formatDate(docData.updatedAt)}
//       </Td>
//       <Td className="text-center">
//         <ToggleFavouriteButton
//           id={docData.id}
//           isFavourite={docData.isFavorite}
//           onToggle={handleFavouriteUpdate}
//         />
//       </Td>
//       <Td className="text-center">
//         <DeleteButton
//           id={docData.id}
//           onDelete={() => handleDeleteData(docData.id, -1)}
//         /> 
//       </Td>
//       {isOpen && (
//         <ContentTable
//           id={docData.id}
//           content={docData.content}
//           onclick={onClick}
//           handleDelete={handleDeleteData}
//         />
//       )}
//     </tr>
//   );
// }

// function ContentTable({
//   id,
//   content,
//   onclick,
//   handleDelete,
// }: {
//   id: string;
//   content: string[];
//   onclick: (i: number) => void;
//   handleDelete: (id: string, index: number) => void;
// }) {
//   return (
//     <table className="absolute cursor-default top-12 z-40 left-0 w-full h-fit bg-primary-light border rounded-md border-gray-200">
//       <thead className="bg-gray-200">
//         <tr>
//           <Th className="text-left pl-4 sm:pl-10">Content</Th>
//           <Th className="text-center">Delete</Th>
//         </tr>
//       </thead>
//       <tbody>
//         {content.map((str, index) => (
//           <tr key={index} className="hover:bg-gray-200">
//             <Td
//               onClick={() => onclick(index)}
//               className="flex !whitespace-normal !min-w-full items-center cursor-pointer"
//             >
//               <FaFileAlt className="inline mr-2 text-white" />
//               <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
//                 {parseHtml(str)}
//               </span>
//             </Td>
//             <Td className="!max-w-fit">
//               <DeleteButton
//                 id={id}
//                 index={index}
//                 onDelete={() => handleDelete(id, index)}
//               />
//                {/* <button
//                className="flex items-center justify-center w-full h-full gap-2"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(index);
//                 }}
//               >
//                 <FaTrashAlt size={18} className="text-red-500" />
//                 <span>Delete</span>
//               </button> */}
//             </Td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }




import { formatDate, parseHtml } from "@/lib/utils";
import Td from "./Td";
import { FaFileAlt } from "react-icons/fa";
import { Research } from "@/app/(tools)/research/page";
import { useRef, useState } from "react";
import Th from "./Th";
import useClickOutside from "@/hooks/useClickOutisde";
import ToggleFavouriteButton from "../ui/ToggleFavouriteButton";
import DeleteButton from "../ui/DeleteButton";

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

  const tableRef = useRef<HTMLTableRowElement>(null);

  const closeTable = () => {
    setIsOpen(false);
  };
  useClickOutside(tableRef, closeTable);

  return (
    <>
      <tr
        ref={tableRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-200 relative cursor-pointer"
      >
        <Td className="flex !whitespace-normal items-center">
          <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
            {docData.id}
          </span>
        </Td>
        <Td className="text-center text-white">{docData.content.length}</Td>
        <Td className="text-center max-w-[6ch] sm:max-w-[14ch] md:max-w-[25ch]truncate">
          {formatDate(docData.updatedAt)}
        </Td>
        <Td className="text-center">
          <ToggleFavouriteButton
            id={docData.id}
            isFavourite={docData.isFavorite}
            onToggle={handleFavouriteUpdate}
          />
        </Td>
        <Td className="text-center">
          <DeleteButton
            id={docData.id}
            onDelete={() => handleDeleteData(docData.id, -1)}
          />
        </Td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan={5} className="p-0">
            <ContentTable
              id={docData.id}
              content={docData.content}
              onClick={onClick}
              handleDelete={handleDeleteData}
            />
          </td>
        </tr>
      )}
    </>
  );
}

function ContentTable({
  id,
  content,
  onClick,
  handleDelete,
}: {
  id: string;
  content: string[];
  onClick: (i: number) => void;
  handleDelete: (id: string, index: number) => void;
}) {
  return (
    <table className="w-full bg-primary-light border rounded-md border-gray-200">
      <thead className="bg-gray-200/70">
        <tr>
          <Th className="text-left pl-4 sm:pl-10">Content</Th>
          <Th className="text-center">Delete</Th>
        </tr>
      </thead>
      <tbody>
        {content.map((str, index) => (
          <tr key={index} className="hover:bg-gray-200">
            <Td
              onClick={() => onClick(index)}
              className="flex !whitespace-normal !min-w-full items-center cursor-pointer"
            >
              <FaFileAlt className="inline mr-2 text-white" />
              <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
                {parseHtml(str)}
              </span>
            </Td>
            <Td className="!max-w-fit">
              <DeleteButton
                id={id}
                index={index}
                onDelete={() => handleDelete(id, index)}
              />
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
