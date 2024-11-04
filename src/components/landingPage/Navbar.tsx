"use client";

import React from "react";
import { useState } from "react";
import Logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "../../../public/images/Hamburger.svg";
import GoogleSignup from "../GoogleSignup";
import { useSession } from "next-auth/react";
// import { MdDashboard } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const [mobileNavigation, setMobileNavigation] = useState(false);
  const { data: session } = useSession();
  const loggedIn = !!session?.user?.accessToken;

  const Links = [
    {
      name: "Resources",
      href: "/resources",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Company",
      href: "/company",
    },
    {
      name: "Support",
      href: "/support",
    },
  ];

  return (
    <header
      className={`container-wrapper sticky top-0 backdrop-blur-3xl z-20 h-[80px] items-center sm:h-[94px] text-white ${
        mobileNavigation ? "bg-black" : "backdrop-blur-3xl"
      }`}
    >
      <div className="content-container bg-blue-80 flex justify-between py-4 md:py-6 items-center">
        {/* Hamburger menu button */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileNavigation(!mobileNavigation)}
        >
          <Image src={Hamburger} width={40} height={40} alt="" />
        </div>
        <div className="w-24 sm:w-40 ">
          <Link href="/">
            <Image src={Logo} width={130} height={130} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:flex">
          <nav className="space-x-10 m-auto md:text-lg lg:text-xl">
            {Links.map(({ name, href }, i) => (
              <Link key={i} className="hover:text-green-500" href={href}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          {loggedIn ? (
            <Link
              className="flex items-center -mt-2  gap-2 cursor-pointer hover:scale-110 ease-in-out duration-150"
              href="/write"
            >
              {/* <MdDashboard size={24} className="text-primary-green" /> */}
              <span className="sm:inline-block text-xl font-medium">
                Dashboard
              </span>
              <MdOutlineArrowOutward size={24} />
            </Link>
            // <Link
            //   className="flex items-center -mt-2  gap-2 cursor-pointer hover:scale-110 ease-in-out duration-150"
            //   href="/dashboard"
            // >
            //   {/* <MdDashboard size={24} className="text-primary-green" /> */}
            //   <span className="sm:inline-block text-xl font-medium">
            //     Dashboard
            //   </span>
            //   <MdOutlineArrowOutward size={24} />
            // </Link>
          ) : (
            <div className="bg-white rounded-lg text-black hover:scale-110 ease-in-out duration-150">
              <GoogleSignup />
            </div>
          )}
        </div>
      </div>
      <div
        className={`content-container md:hidden ${
          mobileNavigation ? "block" : "hidden"
        }`}
      >
        <nav className="text-lg bg-black border-b">
          <ul className="flex flex-col justify-center items-center gap-10 py-5">
            {Links.map(({ name, href }, i) => (
              <li key={i}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
