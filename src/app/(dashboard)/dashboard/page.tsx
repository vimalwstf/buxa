"use client";
import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";
import Loader from "@/components/Loader";
import useFetchUser from "@/hooks/useFetchUser";
import StatLevel from "@/components/dashboard/StatLevel";
import MobileNav from "@/components/dashboard/MobileNav";
export default function Dashboard() {
  // fetch user profile data
  const { isLoading } = useFetchUser();
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col mx-auto md:mr-5">
        <Navbar />
        <div className="fixed top-0 z-20 w-full "><MobileNav /></div>
        
        {isLoading ? (
          <div className="flex mx-auto justify-center items-center h-[90vh]">
            <Loader />
          </div>
        ) : (
          <div className="flex-col md:flex-row flex mt-14 lg:mt-0">
            <div className="flex-1 flex flex-col">
              <Stats />
              <StatLevel />
              <Table />
            </div>
            <Alerts />
          </div>
        )}
      </div>
    </div>
  );
}
