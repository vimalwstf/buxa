interface TableHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Th({ children, className = "" }: TableHeaderProps) {
  return (
    <th scope="col" className={`px-1 py-3 text-white font-medium ${className}`}>
      {children}
    </th>
  );
}
