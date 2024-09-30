import React from "react";
import { RiHome3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full md:h-[90px] bg-[#6366F1] fixed top-0 z-10 flex justify-start gap-10 items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            // src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnG4j1txj99OCGXDaTFsEU8wso7G_0N4CeDKTfjiSHJ8K21UNP"
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="rounded-full"
          />
          {/* <span className="text-white text-2xl font-semibold">Up Writer.ai</span> */}
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <div className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
            <RiHome3Line size={26} />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
<span className="text-white text-3xl font-thin">|</span>
          <div className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
            <FaRegUser size={24} />
            <span className="text-xl font-bold">Accounts</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
