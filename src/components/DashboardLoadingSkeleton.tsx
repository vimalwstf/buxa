import React from "react";

const DashboardLoadingSkeleton: React.FC = () => {
  return (
    <main className="w-full p-4 animate-pulse">
      <div className="flex gap-4">
        {/* Mobile Sidebar Skeleton */}
        <div className="fixed inset-0 z-40 transition-transform transform md:hidden translate-x-0 ease-in-out duration-300">
          <div className="relative w-full h-full bg-gray-300 shadow-lg">
            {/* Simulate Sidebar Loading */}
            <div className="w-full h-full bg-gray-300"></div>
          </div>
        </div>

        {/* Desktop Sidebar Skeleton */}
        <div className="w-[20%] max-w-[25%] overflow-hidden hidden md:block flex-[0.4]">
          <div className="w-full h-full bg-gray-300"></div>
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1">
          <div className="flex justify-between mb-4 items-baseline">
            <div className="flex items-center gap-2">
              {/* Back Icon Skeleton */}
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              {/* Document List Heading Skeleton */}
              <div className="h-6 bg-gray-400 rounded w-32"></div>
            </div>

            {/* Save Button Skeleton */}
            <div className="text-black flex items-center gap-2 bg-gray-400 px-4 py-2 text-sm rounded-md shadow-md w-24 h-10"></div>
          </div>

          {/* Editor Skeleton */}
          <div className="w-full h-40 bg-gray-300 rounded"></div>
        </div>

        {/* Document List Skeleton */}
        <div className="flex-grow">
          <div className="space-y-4">
            {/* Simulating multiple document list items */}
            <div className="w-full h-8 bg-gray-300 rounded"></div>
            <div className="w-full h-8 bg-gray-300 rounded"></div>
            <div className="w-full h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button for Mobile Skeleton */}
      <div className="fixed bottom-2 right-0 m-4 z-50">
        <div className="bg-gray-400 rounded-lg shadow-lg p-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLoadingSkeleton;
