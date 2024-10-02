import React, { useState } from "react";
import TableRow from "./TableRow";

function Table({ favourites }: { favourites: boolean }) {
  const initialData = [
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

  const [data, setData] = useState(initialData);

  // Function to handle updating favourites
  const handleFavouriteToggle = (index: number, isFavourite: boolean) => {
    const newData = [...data];
    newData[index].favourite = isFavourite;
    setData(newData);
  };

  return (
    <div
      style={{ backgroundColor: "#f8f9fe" }}
      className="border rounded-lg overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <Th className="text-start">Name</Th>
            <Th className="text-center">Words</Th>
            <Th className="text-center">Modified</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, i) =>
            favourites ? (
              item.favourite && (
                <TableRow
                  key={i}
                  data={item}
                  onFavouriteToggle={(isFavourite) =>
                    handleFavouriteToggle(i, isFavourite)
                  }
                />
              )
            ) : (
              <TableRow
                key={i}
                data={item}
                onFavouriteToggle={(isFavourite) =>
                  handleFavouriteToggle(i, isFavourite)
                }
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <th
      scope="col"
      className={`px-1 py-3 font-semibold text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
}

export default Table;
