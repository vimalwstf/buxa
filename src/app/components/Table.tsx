import React from "react";
import TableRow from "./TableRow";

function Table({ favourites }: { favourites: boolean }) {
  const data = [
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: true,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: true,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: false,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 1,
      modified: "Sep27,2024 6:57 PM",
      favourite: true,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: false,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: true,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: false,
    },
    {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      words: 0,
      modified: "Sep27,2024 6:57 PM",
      favourite: true,
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#f8f9fe" }}
      className="border rounded-lg overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Words</Th>
            <Th>Modified</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, i) =>
            favourites ? (
              item.favourite && <TableRow key={i} data={item} />
            ) : (
              <TableRow key={i} data={item} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-start font-semibold text-s text-gray-500"
    >
      {children}
    </th>
  );
}

export default Table;