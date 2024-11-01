import { FC } from "react";
import TableRow from "@/components/dashboard/TableRow";
import Glass from "../ui/Glass";

const Table: FC = () => {
  const mockData = [
    {
      title: "Lorem ipsum dolor sit amet",
      type: "Research",
      date: "Sep 27, 2024 6:57 PM",
    },
    {
      title: "Dolor sit amet consectetur",
      type: "Content",
      date: "Sep 27, 2024 6:58 PM",
    },
    {
      title: "Amet lorem ipsum dolor",
      type: "Research",
      date: "Sep 27, 2024 6:59 PM",
    },
    {
      title: "Sit amet consectetur lorem",
      type: "Content",
      date: "Sep 27, 2024 7:00 PM",
    },
    {
      title: "Consectetur dolor sit amet",
      type: "Research",
      date: "Sep 27, 2024 7:01 PM",
    },
  ];

  return (
    <div className="m-3">
      <Glass>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">
            Document History
          </h2>
          <div className="flex flex-col">
            {/* Table Headers */}
            <div className="grid grid-cols-3 py-2 px-4 text-gray-400 border-b border-gray-700">
              <span>Title</span>
              <span>Document type</span>
              <span>Date</span>
            </div>

            {/* Scrollable Rows */}
            <div className="element overflow-y-auto max-h-[400px] md:max-h-[200px]">
              {[...mockData, ...mockData, ...mockData].map((doc, index) => (
                <TableRow
                  key={index}
                  title={doc.title}
                  type={doc.type}
                  date={doc.date}
                />
              ))}
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
};

export default Table;
