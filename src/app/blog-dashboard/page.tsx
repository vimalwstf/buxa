"use client";
import BlogDashboardTable from "@/components/apiDashboard/BlogDashboardTable";
import MobileNav from "@/components/dashboard/MobileNav";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAppSelector } from "@/lib/hooks";
// import { BiTrash } from "react-icons/bi";

export default function ApiTable() {
  const credits = useAppSelector((state) => state.user.user?.credits);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar credits={credits as number} />
        <div className="fixed top-0 z-20 w-full ">
          <MobileNav credits={credits as number} />
        </div>
        <BlogDashboardTable />
      </div>
    </div>
  );
}
