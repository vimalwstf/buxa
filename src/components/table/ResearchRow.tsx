"use client";
import { formatDate, parseHtml } from "@/lib/utils";
import Td from "./Td";
import { FaStar } from "react-icons/fa6";
import { FaFileAlt, FaRegStar } from "react-icons/fa";
import OptionsModal from "./OptionsModal";

export default function ResearchRow({
  item,
  openEditor,
  handleDeleteData,
  handleFavouriteUpdate,
}: {
  item: any;
  openEditor: (item: any) => void;
  handleDeleteData: (id: string) => void;
  handleFavouriteUpdate: (id: string) => void;
}) {
  return (
    <tr className="hover:bg-gray-200 cursor-pointer">
      <Td
        onClick={() => openEditor(item)}
        className="flex !whitespace-normal items-center"
      >
        {/* <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" /> */}
        <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
          {item.topic}
        </span>
      </Td>
      <Td className="text-center text-white">{item.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{formatDate(item?.modified)}</span>
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
        <OptionsModal handleDeleteData={handleDeleteData} id={item.id} />
      </Td>
    </tr>
  );
}

function DocumentRow({ row}: {row: }) {
  return (
    <div>
      <Td
        // onClick={() => openEditor(item)}
        className="flex !whitespace-normal items-center"
      >
        <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" />
        <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
          {parseHtml(row.name)}
        </span>
      </Td>
      <Td className="text-center text-white">{item.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{formatDate(item?.modified)}</span>
        <span className="sm:hidden">
          {formatDate(item?.modified).slice(0, 10)}...
        </span>
      </Td>
      <Td>
        <button
          {/*  onClick={(e) => {
            e.stopPropagation();
            handleFavouriteUpdate(item.id);
          }} */}
        >
          {item.favourite ? (
            <FaStar size={18} className="text-primary-green" />
          ) : (
            <FaRegStar size={18} className="text-white" />
          )}
        </button>
      </Td>
      {/* <Td>
    <OptionsModal
      handleDeleteData={handleDeleteData}
      id={item.id}
    />
  </Td> */}
    </div>
  );
}
