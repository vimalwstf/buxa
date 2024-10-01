'use client';

import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Effect to handle window resize and reset sidebar state
  useEffect(() => {
    const handleResize = () => {
      // If the screen is larger than 'md', close the sidebar
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="w-full p-6 md:mt-20 relative">
      <div className="flex gap-4">
        {/* Sidebar: This will be shown/hidden based on the state and screen size */}
        <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
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
  );
};

export default Dashboard;
