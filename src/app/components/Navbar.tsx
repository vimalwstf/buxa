"use client";
import React, { useState } from "react";
import { RiHome3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../authContext/Context";
import { useContext } from "react";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const url =
        "https://c285-2401-4900-8841-3999-354a-cbfb-b65e-665f.ngrok-free.app/api/users/logout";
      const refreshToken = user.refreshToken;
      try {
        const res = await axios.post(url, refreshToken);
        if (res.status === 200) logOut();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data?.message || error.message);
        }
      }
    }

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
            className="rounded-full w-[150px] h-[150px]"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <div
            className="relative flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
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
    </div>
  );
};

export default Navbar;
