"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "../../../public/images/Hamburger.svg";
import GoogleSignup from "../GoogleSignup";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";


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


const Navbar = () => {
  const [mobileNavigation, setMobileNavigation] = useState(false);
  const { isLoading, checkUser } = useAuth();

  
  // const loggedIn = localStorage.getItem("");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const loggedIn = parsedUser?.accessToken;

  useEffect(() => {
    checkUser();
  }, []);

 
  return (
    <header
      className={`container-wrapper sticky top-0 backdrop-blur-3xl py-4 z-20 h-[80px] items-center text-white ${
        mobileNavigation ? "bg-black" : "backdrop-blur-3xl"
      }`}
    >
      <div className="content-container bg-blue-80 flex justify-between items-center">
        {/* Hamburger menu button */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileNavigation(!mobileNavigation)}
        >
          <Image src={Hamburger} width={30} height={30} alt="hamburger" />
        </div>
        <div className="w-24 sm:w-40 ">
          <Link href="/">
            <Image src={Logo} width={120} height={120} alt="logo" />
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
              className="flex group items-center md:gap-2 cursor-pointer hover:scale-110 ease-in-out duration-150"
              href="/write"
            >
              <span className=" text-sm sm:inline-block md:text-xl font-medium">
                Dashboard
              </span>
              <MdOutlineArrowOutward
                className="group-hover:scale-150 group-hover:text-primary-green ease-in-out"
                size={26}
              />
            </Link>
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
