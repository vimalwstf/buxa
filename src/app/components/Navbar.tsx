// import React from "react";
// import { RiHome3Line } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <div>
//       <nav className="w-full md:h-[90px] bg-[#6366F1] fixed top-0 z-10 flex justify-start gap-10 items-center px-6 py-4">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3">
//           <img
//             src="/logo.png"
//             alt="logo"
//             width={150}
//             height={150}
//             className="rounded-full"
//           />
//         </div>

//         {/* Navigation Links */}
//         <div className="flex space-x-4">
//           {/* <div className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
//             <RiHome3Line size={26} />
//             <span className="text-xl font-bold">Dashboard</span>
//           </div>
//           <span className="text-white text-3xl font-thin">|</span> */}
//           <div className="flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
//             <FaRegUser size={24} />
//             <span className="text-xl font-bold">Account</span>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React, { useState } from "react";
import { RiHome3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
// import { useRouter } from "next/router"; 

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  // const router = useRouter(); 

  const handleLogout = () => {
 
    // router.push("/login"); 
  };

  return (
    <div>
      <nav className="w-full md:h-[90px] bg-[#6366F1] fixed top-0 z-10 flex justify-between  items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">

          <div className="relative flex items-center text-white space-x-2 hover:text-gray-300 cursor-pointer">
            <FaRegUser size={24} />
            <span
              className="text-xl font-bold"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Account
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-20">
                <ul className="py-2 text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="mt-[90px] flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <RiHome3Line size={24} className="text-white" />
            <span className="text-white text-xl">Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
