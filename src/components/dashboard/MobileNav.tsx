import React, { useState } from "react";
import { FaBars, FaCreditCard } from "react-icons/fa6";
import LogoutBtn from "../LogoutBtn";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiX } from "react-icons/bi";
import { LiaPenNibSolid } from "react-icons/lia";
import { TbListSearch } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";

const sidebarLinks = [
  { icon: <MdDashboard />, href: "/dashboard", name: "Dashboard" },
  { icon: <LiaPenNibSolid />, href: "/write", name: "Write with AI" },
  {
    icon: <TbListSearch />,
    href: "/research",
    name: "Research with AI",
  },
  { icon: <BsBellFill />, href: "/alert", name: "Alert with AI" },
];

const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsOpen(!isOpen);

  return (
    <div className="block md:hidden w-full bg-transparent h-[75px] relative">
      <div className="flex justify-between items-center p-4 h-full">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none z-50 -mt-4"
        >
          {isOpen ? <BiX size={28} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 w-[65%] h-full bg-black text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out p-6 z-40`}
      >
        <div className="flex items-center space-x-2 mb-6">
          <FaCreditCard size={24} className="text-primary-green" />
          <span className="text-lg font-medium">90 Credits</span>
        </div>
        <div>
          <LogoutBtn />
        </div>
        {sidebarLinks.map(({ icon, href, name }, index) => (
          <div key={index} className="flex flex-col pt-[26px]">
            <Link href={href} className="flex justify-between items-center">
              <div
                className={`flex justify-center text-xl font-medium items-center px-4 gap-2 hover:text-primary-green hover:cursor-pointer ${
                  href === pathname ? "text-primary-green" : "text-text-third"
                }`}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </div>
              {href === pathname && (
                <div className="bg-primary-green w-[5px] h-[22px] rounded-md right-0"></div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
