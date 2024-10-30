import React from "react";

interface TableDataProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Td({
  children,
  className = "",
  ...props
}: TableDataProps) {
  return (
    <td
      className={`px-2 sm:px-6 whitespace-nowrap py-4 text-sm font-medium text-white max-w-[8ch] sm:max-w-[14ch] md:max-w-[25ch] lg:max-w-[40ch] truncate ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
