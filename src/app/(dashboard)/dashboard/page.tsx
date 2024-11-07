"use client";

import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";
import Loader from "@/components/Loader";
import StatLevel from "@/components/dashboard/StatLevel";
import MobileNav from "@/components/dashboard/MobileNav";
import {  useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
import useGetStatistics from "@/hooks/useGetStatistics";
import Loading from "@/app/loading";

export default function Dashboard() {
  // const { isLoading, checkUser } = useAuth();
  const [stats, setStats] = useState();
  const { isLoading: statsLoading } = useGetStatistics(setStats);

  console.log("stats", stats);

 


  return (
    <div className="flex">
      <Sidebar />

      {statsLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="fixed top-0 z-20 w-full ">
            <MobileNav />
          </div>

          {statsLoading ? (
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
      )}
    </div>
  );
}
