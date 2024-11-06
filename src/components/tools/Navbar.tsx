"use client";

import React, { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PaymentModal from "@/components/credits/PaymentModal";
// import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import LogoutBtn from "@/components/LogoutBtn";
import { useAuth } from "@/hooks/useAuth";
// import useFetchUser from "@/hooks/useFetchUser";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { logIn } from "@/lib/user/userSlice";

// const TokenVerify = async () => {
//   const accessToken = localStorage.getItem("token");
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "ngrok-skip-browser-warning": true,
//         },
//       }
//     );
//     return response;
//   } catch (err: any) {
//     return err.message;
//   }
// };

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const user = useAppSelector((state) => state.user.user);

  // Handle opening and closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { isLoading, checkUser } = useAuth();

  
  // const loggedIn = localStorage.getItem("");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const credits = parsedUser?.credits;

  useEffect(() => {
    checkUser();
  }, []);

  // const [callCount, setCallCount] = useState(0);
  // const dispatch = useDispatch();
  // // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // fetch user profile data

  // const checkUser = async () => {
  //   if (typeof window != "undefined") {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await TokenVerify();
  //       console.log("data", data);
  //       if (data?.status) {
  //         dispatch(logIn(data?.data));
  //         setCallCount(1);
  //         // setIsLoading(false);
  //       } else {
  //         // setIsLoading(false);
  //       }
  //     } else {
  //       // setIsLoading(false);
  //       router.push("/")
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     if (callCount === 1) {
  //       if (user != null) {
  //         // setIsLoading(false);
  //       } else {
  //         router.push("/");
  //         // setIsLoading(false);
  //       }
  //     } else {
  //       if (user != null) {
  //         // setIsLoading(false);
  //       } else {
  //         checkUser();
  //       }
  //     }
  //   }
  // }, [callCount]);

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
              {credits} credits
            </span>
          </div>

          {/* LogoutBtn  */}
          <LogoutBtn />
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal
        isModalOpen={isModalOpen}
        creditBalance={credits}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Navbar;
