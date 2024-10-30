"use client";
import React from "react";
import { IoLogOut } from "react-icons/io5";
import useLogout from "@/hooks/useLogout";
const LogoutBtn = () => {
  const handleLogout = useLogout();
  return (
    <button
      className="flex items-center  text-nowrap gap-2 font-bold cursor-pointer"
      onClick={handleLogout}
    >
      <IoLogOut
        size={30}
        className="rotate-180 text-red-500 hover:scale-110 transition-all duration-200"
      />
      <span className="inline sm:hidden text-white font-medium">Logout</span>
    </button>
  );
};

export default LogoutBtn;
