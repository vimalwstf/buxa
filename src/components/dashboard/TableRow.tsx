
import { FC } from "react";
import { FaFileAlt } from "react-icons/fa";

interface TableRowProps {
  title: string;
  type: string;
  date: string;
}

const TableRow: FC<TableRowProps> = ({ title, type, date }) => {
  return (
    <div className="grid grid-cols-3 items-center py-2 px-4 text-gray-300 hover:bg-gray-800">
      <div className="flex items-center space-x-2">
        <FaFileAlt className="text-gray-500" />
        <span>{title}</span>
      </div>
      <span>{type}</span>
      <span>{date}</span>
    </div>
  );
};

export default TableRow;
