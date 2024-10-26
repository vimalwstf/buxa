"use client";
import React from "react";
import { useState } from "react";
import Logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "../../../public/images/Hamburger.svg";
import GoogleSignup from "../GoogleSignup";

const Navbar = () => {
  const [mobileNavigation, setMobileNavigation] = useState(false);

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
      className={`container-wrapper sticky top-0 h-[80px] items-center sm:h-[94px] ${mobileNavigation ? "bg-black" : "backdrop-blur-3xl"}`}
    >
      <div className="content-container z-50 bg-blue-80 flex justify-between py-4 md:py-6 items-center">
        {/* hamburger menu button */}
        <div
          className="md:hidden"
          onClick={() => setMobileNavigation(!mobileNavigation)}
        >
          <Image src={Hamburger} width={40} height={40} alt="" />
        </div>
        <div className=" flex items-center text-2xl md:text-2xl w-24 sm:w-40 font-bold text-green-500">
          <Link className="" href="/">
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
          <div className="bg-white rounded-lg text-black hover:scale-110 ease-in-out duration-150">
            <GoogleSignup />
          </div>
        </div>
      </div>
      <div
        className={`ease-in-out z-40 transition-all duration-150 content-container md:hidden ${
          mobileNavigation ? "translate-y-0" : "-translate-y-[calc(100%+80px)]"
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