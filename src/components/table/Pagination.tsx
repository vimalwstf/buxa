import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function usePagination(totalItems: number, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages < currentPage) setCurrentPage(totalPages);

  return {
    totalPages,
    currentPage,
    setCurrentPage,
    firstIndex,
    lastIndex,
  };
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const generatePagination = () => {
    const pages = [];
    const ellipsis = "...";

    pages.push(1);

    if (currentPage > 3) pages.push(ellipsis);

    for (let i = currentPage - 2; i <= currentPage + 2; i++)
      if (i > 1 && i < totalPages) pages.push(i);

    if (currentPage < totalPages - 2) pages.push(ellipsis);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto max-w-max flex bg-primary-light py-2 px-1 rounded-full shadow-sm justify-center items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 flex gap-2 items-center cursor-pointer text-text-third disabled:cursor-default"
      >
        <FaChevronLeft />
        <span className="font-medium">Prev</span>
      </button>
      <div className="flex items-center">
        <div className="flex gap-2 justify-center items-center">
          {generatePagination().map((page, index) => {
            if (page === "...") {
              return (
                <span key={index} className="text-primary-green font-bold">
                  {page}
                </span>
              );
            }
            return (
              <span
                key={index}
                onClick={() => handlePageChange(Number(page))}
                className={`${
                  currentPage === page
                    ? "bg-primary-green text-black"
                    : "text-primary-green"
                } px-2 py-1 rounded-md cursor-pointer `}
              >
                {page}
              </span>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 flex gap-2 items-center cursor-pointer text-text-third disabled:cursor-default"
      >
        <span className="font-medium">Next</span>
        <FaChevronRight />
      </button>
    </div>
  );
}
