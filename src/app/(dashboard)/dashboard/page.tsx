"use client";
import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";
import Loader from "@/components/Loader";
import useFetchUser from "@/hooks/useFetchUser";
export default function Dashboard() {
  // fetch user profile data
  const { isLoading } = useFetchUser();
  return (
    <div className="flex">
      <Sidebar />
     
      <div className="flex-1 flex flex-col mr-5">
        <Navbar />
        {isLoading ? (
          <div className="flex mx-auto justify-center items-center h-[90vh]">
            <Loader />
          </div>
        ) : (
          <div className=" flex">
            <div className="flex-1 flex flex-col">
              <Stats />
              <Table />
            </div>
            <Alerts />
          </div>
        )}
      </div>
    </div>
  );
}
