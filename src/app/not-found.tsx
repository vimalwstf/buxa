import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-black gap-4">
      <h1 className="text-3xl md:text-8xl font-medium text-gray-400 ">
        404 : Page Not Found!
      </h1>
      <Link
        href="/"
        className="hover:underline text-2xl text-white tracking-wide hover:scale-105 duration-300 transition-all ease-in-out"
      >
        Go back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
