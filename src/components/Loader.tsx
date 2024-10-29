import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-32 space-x-2 h-[100vh] ">
      <div className="w-4 h-4 bg-zinc-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-zinc-500 rounded-full animate-pulse delay-200"></div>
      <div className="w-4 h-4 bg-zinc-500 rounded-full animate-pulse delay-400"></div>
    </div>
  );
};

export default Loader;
