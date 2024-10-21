import React from "react";

const FooterLoadingSkeleton: React.FC = () => {
  return (
    <div className="container-wrapper py-10">
      <footer className="bg-gray-900 content-container flex-col lg:flex-row rounded-xl text-white p-10 mb-10 text-center sm:text-start">
        <div className="mx-auto md:flex">
          <div className="mb-10 md:mb-0 md:w-1/2">
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="text-2xl font-bold text-green-500">
                <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
              </div>
              <div className="mt-4 w-3/4 space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center sm:items-start sm:justify-start gap-10 mb-8 md:mb-2 px-4">
            <div className="md:w-1/5 flex flex-col items-center">
              <div className="h-6 w-24 bg-gray-700 rounded"></div>
              <ul className="mt-4 space-y-2">
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
              </ul>
            </div>

            <div className="md:w-1/5 flex flex-col items-center">
              <div className="h-6 w-24 bg-gray-700 rounded"></div>
              <ul className="mt-4 space-y-2">
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
                <li className="h-4 w-16 bg-gray-700 rounded"></li>
              </ul>
            </div>

            <div className="w-1/2 md:w-3/5">
              <div className="h-6 w-24 bg-gray-700 rounded"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center md:justify-start items-center mb-10 gap-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>

        <div className="text-center md:w-full opacity-50">
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      </footer>
    </div>
  );
};

export default FooterLoadingSkeleton;
