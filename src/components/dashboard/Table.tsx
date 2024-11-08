import TableRow from "@/components/dashboard/TableRow";
import Glass from "../ui/Glass";
import { StatDocs } from "@/hooks/useGetStatistics";

const Table = ({ data }: { data: StatDocs[] }) => {
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
              {data.map((doc, index) => (
                <TableRow
                  key={index}
                  title={doc.content}
                  type={doc.documentType}
                  date={doc.createdAt}
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
