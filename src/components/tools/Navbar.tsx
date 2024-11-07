"use client";

import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PaymentModal from "@/components/credits/PaymentModal";
// import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "@/components/LogoutBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import useFetchUser from "@/hooks/useFetchUser";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening and closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const { isLoading, checkUser } = useAuth();
  const { isLoading } = useFetchUser();

  const { value: user } = useLocalStorage("user", {
    credits: "",
  });
  const credits = user?.credits;

  // useEffect(() => {
  //   checkUser();
  // });

  return (
    <div>
      <nav
        className={`w-full md:h-[60px] flex justify-between items-center px-6 py-4 }`}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center pt-4">
          <Image src="/logo.svg" alt="Logo" width={95} height={95} />
        </Link>

        {/* Hamburger Icon (visible on smaller screens) */}
        <div className="md:hidden flex items-center fixed right-2 z-20">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <HiOutlineX size={30} className="text-white" />
            ) : (
              <HiOutlineMenu size={30} className="text-white" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`mobile-nav laptop:justify-end fixed md:static top-0 right-0 h-full w-[60%] md:w-auto bg-black md:bg-transparent p-6 md:p-0 flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-4
            transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
        >
          {/* <Link
            className="flex items-center md:mt-0 mt-10 text-white space-x-2 cursor-pointer"
            href="/dashboard"
          >
            <MdDashboard size={24} className="text-primary-green" />
            <span className="sm:inline-block text-lg sm:text-xl font-medium">
              Dashboard
            </span>
          </Link> */}
          <div className="flex items-center md:mt-0 mt-10 text-white space-x-2 cursor-pointer">
            <FaCreditCard size={24} className="text-primary-green" />
            <span className="sm:inline-block text-lg sm:text-xl font-medium">
              {isLoading ? "..." : credits} credits
            </span>
          </div>
          {/* LogoutBtn  */}
          <LogoutBtn />
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal
        isModalOpen={isModalOpen}
        creditBalance={Number(credits)}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Navbar;
