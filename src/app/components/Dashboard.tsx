"use client";

import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../authContext/Context";
import Login from "../login/page";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLoggedIn ? (
    <main className="w-full p-6 md:mt-20 relative">
      <div className="flex gap-4">
        {/* Sidebar: This will be shown/hidden based on the state and screen size */}
        <div
          className={`fixed inset-0 z-40 md:hidden ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative w-full top-24 left-0">
            <Sidebar />
          </div>
        </div>

        {/* Sidebar: Visible on larger screens */}
        <div className={`w-[300px] max-w-[400px] hidden md:block`}>
          <Sidebar />
        </div>

        {/* Document List: Always visible */}
        <div className="flex-grow">
          <DocumentList />
        </div>
      </div>

      {/* Pen Icon to toggle sidebar */}
      <div className="fixed bottom-2 right-0 m-4 z-50">
        <div
          className="bg-[#989898] rounded-lg shadow-lg p-3 cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <CiPen className="text-2xl text-gray-800" />
        </div>
      </div>
    </main>
  ) : (
    <Login />
  );
};

export default Dashboard;
