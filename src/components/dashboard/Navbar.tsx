import React from "react";
import { FaCreditCard } from "react-icons/fa6";
import LogoutBtn from "../LogoutBtn";

const Navbar = ({ credits }: { credits: number }) => {
  return (
    <nav className="hidden lg:block w-full md:w-[calc(100% - 300px)] backdrop-blur-sm bg-opacity-30 bg-[#0a0a0d] h-[75px] z-99">
      <div className="flex justify-between items-center p-4 border border-t-0 rounded-br-[8px] rounded-bl-[8px] h-full ml-3">
        <div>
          <h3>John Doe</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="flex items-center justify-center gap-4 font-medium">
          <div className="flex items-center text-white space-x-2 cursor-pointer">
            <FaCreditCard size={24} className="text-primary-green" />
            <span className="sm:inline-block text-lg sm:text-xl font-medium">
              {credits} Credits
            </span>
          </div>
          <LogoutBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
