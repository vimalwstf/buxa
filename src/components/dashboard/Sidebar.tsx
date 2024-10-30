"use client";
import React from "react";
import { MdDashboard } from "react-icons/md";
// import { FaPenNib } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { BsBellFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { LiaPenNibSolid } from "react-icons/lia";

const sidebarLinks = [
  { icon: <MdDashboard />, href: "/dashboard", name: "Dashboard" },
  { icon: <LiaPenNibSolid />, href: "/write", name: "Write with AI" },
  {
    icon: <TbListSearch />,
    href: "/research",
    name: "Research with AI",
  },
  { icon: <GoBell />, href: "/alert", name: "Alert with AI" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block h-[99vh] w-[300px] bg-[#0A0A0D] rounded-br-[8px] border border-gray-200 border-l-0 border-t-0 pt-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={120}
          height={120}
          className="ml-4 py-[6px]"
        />
      </Link>
      {sidebarLinks.map(({ icon, href, name }, index) => {
        return (
          <div key={index} className="flex flex-col pt-[26px]">
            <Link href={href} className="flex justify-between items-center">
              <div
                className={`flex justify-center text-xl font-medium items-center px-4  gap-2 hover:text-primary-green hover:cursor-pointer ${
                  href === pathname ? "text-primary-green" : "text-text-third "
                }`}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </div>
              {href === pathname && (
                <div className=" bg-primary-green w-[5px] h-[22px] rounded-md right-0"></div>
              )}
            </Link>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
