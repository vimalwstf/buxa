"use client";
import React from "react";
import { MdDashboard, MdManageSearch } from "react-icons/md";
import { FaPenNib } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { BsBellFill } from "react-icons/bs";

const sidebarLinks = [
  { icon: <MdDashboard />, href: "/dashboard", name: "Dashboard" },
  { icon: <FaPenNib />, href: "/dashboard/write", name: "Write with AI" },
  {
    icon: <MdManageSearch />,
    href: "/dashboard/research",
    name: "Research with AI",
  },
  { icon: <BsBellFill />, href: "/dashboard/alert", name: "Alert with AI" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="h-screen w-[300px] bg-[#0A0A0D] rounded-md border-2 border-gray-200 border-l-0 border-t-0 pt-12">
      <Image src={Logo} alt="logo" width={120} height={120} className="ml-4" />
      {sidebarLinks.map(({ icon, href, name }, index) => {
        return (
          <div key={index} className="flex flex-col pt-10">
            <Link href={href} className="flex justify-between items-center">
              <div
                className={`flex justify-center text-xl font-medium items-center px-4  gap-2 hover:text-bg-primary-green hover:cursor-pointer ${
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

export default DashboardSidebar;
