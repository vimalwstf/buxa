"use client";
import React, { useState } from "react";
import { RiHome3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div>
      <nav className="w-full md:h-[90px] bg-[#6366F1] fixed top-0 z-10 flex justify-between  items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-full w-[120px] h-[120px]"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <div className="relative flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
            <FaRegUser size={24} />
            <span className="text-xl font-bold">Account</span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-20">
                <ul className="text-gray-700">
                  <li
                    className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="mt-[90px] flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <RiHome3Line size={24} className="text-white" />
            <span className="text-white text-xl">Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
