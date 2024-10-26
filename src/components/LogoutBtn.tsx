"use client";
import React from "react";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { logOut } from "@/lib/user/userSlice";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
    await signOut();
  };

  return (
    <button
      className="flex items-center  text-nowrap gap-2 font-bold cursor-pointer"
      onClick={handleLogout}
    >
      <IoLogOut size={30} className="rotate-180 text-red-500" />
      <span className="inline sm:hidden text-white font-medium">Logout</span>
    </button>
  );
};

export default LogoutBtn;
