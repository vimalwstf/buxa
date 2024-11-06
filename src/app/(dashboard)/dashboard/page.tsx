"use client";

import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";
import Loader from "@/components/Loader";
import StatLevel from "@/components/dashboard/StatLevel";
import MobileNav from "@/components/dashboard/MobileNav";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import useGetStatistics, { Stats as StatsType } from "@/hooks/useGetStatistics";
import Loading from "@/app/loading";

export default function Dashboard() {
  const { isLoading, checkUser } = useAuth();
  const { isLoading: statsLoading, stats } = useGetStatistics();

  const {
    credits,
    usedCredits,
    documents,
    totalAlerts,
    totalContent,
    totalResearch,
    coa,
    coc,
    cor,
  }: StatsType = stats || {};

  useEffect(() => {
    checkUser();
  });

  return (
    <div className="flex">
      <Sidebar />

      {statsLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 flex flex-col">
          <Navbar credits={credits} />
          <div className="fixed top-0 z-20 w-full ">
            <MobileNav credits={credits} />
          </div>

          {isLoading ? (
            <div className="flex mx-auto justify-center items-center h-[90vh]">
              <Loader />
            </div>
          ) : (
            stats && (
              <div className="flex-col md:flex-row flex mt-14 lg:mt-0">
                <div className="flex-1 flex flex-col">
                  <Stats
                    totalAlerts={totalAlerts}
                    totalContent={totalContent}
                    totalResearch={totalResearch}
                  />
                  <StatLevel
                    alertCredits={coa}
                    contentCredits={coc}
                    researchCredits={cor}
                    creditBalance={credits}
                    totalCredits={usedCredits}
                  />
                  <Table data={documents} />
                </div>
                <Alerts />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
