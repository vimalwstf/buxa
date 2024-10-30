"use client";

import Td from "@/components/table/Td";
import Th from "@/components/table/Th";
import { MdDelete } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import Pagination, { usePagination } from "../table/Pagination";

export default function AlertList() {
  const AlertListData = [
    {
      topic:
        "Topic 1 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      frequency: "Daily",
      modified: "2022-01-01",
    },
    {
      topic:
        "Topic 2 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      frequency: "Weekly",
      modified: "2022-01-02",
    },
    {
      topic:
        "Topic 3 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      frequency: "Monthly",
      modified: "2022-01-03",
    },
  ];

  const MyAlerts = [
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
    ...AlertListData,
  ];
  const { currentPage, setCurrentPage, firstIndex, lastIndex, totalPages } =
    usePagination(MyAlerts.length);

  const currentAlerts = MyAlerts.slice(firstIndex, lastIndex);

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 ">
      <h2 className="sm:text-2xl text-lg font-bold text-white">Alert List</h2>
      <div className="element flex-1 p-4 text-white overflow-y-scroll w-full rounded-md bg-primary-light">
        <table className="w-full">
          <thead>
            <tr>
              <Th className="text-left pl-4 sm:pl-10">Topic</Th>
              <Th className="text-center">Alert Frequency</Th>
              <Th className="text-center">Modified</Th>
            </tr>
          </thead>
          <tbody className="divide-gray-200">
            {currentAlerts.map((item, i) => (
              <tr key={i}>
                <Td>
                  <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" />{" "}
                  {item.topic}
                </Td>
                <Td className="text-center">{item.frequency}</Td>
                <Td className="text-center">{item.modified}</Td>
                <Td>
                  <MdDelete />
                </Td>
                <Td>
                  <FaEllipsisVertical />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
