import StatCard from "./StatCard";
import { FaBell } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import { FaPenNib } from "react-icons/fa6";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-3 m-3 mt-6 ">
      <StatCard
        icon={FaPenNib}
        title="Total no. of content written"
        count={1254}
      />
      <StatCard
        icon={MdManageSearch}
        title="Total no. of research generated"
        count={452}
      />
      <StatCard icon={FaBell} title="Total no. of alerts" count={48} />
    </div>
  );
}
