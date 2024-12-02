import React, { useEffect, useState } from "react";
import BlogDashboardForm from "@/components/apiDashboard/BlogDashboardForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { apiDash } from "@/actions/apiDash";
import { BlogAPIInfo } from "@/types/type";

interface User {
  accessToken: string;
}

const BlogDashboardTable = () => {
  const { value: user } = useLocalStorage<User>("user", { accessToken: "" });
  const { value: apiDataInitial, setValue: setApiInitialData } =
    useLocalStorage<BlogAPIInfo>("apiData");

  const [apiData, setApiData] = useState<BlogAPIInfo>(
    apiDataInitial ?? {
      ghostBlogs: [],
      wordpressBlogs: [],
    },
  );

  const accessToken = user?.accessToken;

  type Item = {
    blogType: string;
    blogSite:
      | { ghostURL: string; ghostApi: string }
      | { URL: string; username: string; password: string };
  };

  useEffect(() => {
    if (accessToken) {
      apiDash(accessToken)
        .then((res) => {
          const ghostBlogs = res
            .filter((item: Item) => item.blogType === "ghost")
            .map((item: Item) => {
              console.log("itemqwertyuio", item);
              const blogSite = item.blogSite as {
                ghostURL: string;
                ghostApi: string;
              };
              return {
                URL: blogSite.ghostURL,
                ghostApi: blogSite.ghostApi,
              };
            });

          const wordpressBlogs = res
            .filter((item: Item) => item.blogType === "wordpress")
            .map((item: Item) => {
              const blogSite = item.blogSite as {
                URL: string;
                username: string;
                password: string;
              };
              return {
                URL: blogSite.URL,
                username: blogSite.username,
                password: blogSite.password,
              };
            });
          setApiInitialData({ ghostBlogs, wordpressBlogs });
          setApiData({ ghostBlogs, wordpressBlogs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  const ghostData = apiData?.ghostBlogs || [];
  const wordpressData = apiData?.wordpressBlogs || [];

  const [selectedBlogType, setSelectedBlogType] = useState<
    "ghost" | "wordpress"
  >("ghost");

  return (
    <div className="w-full flex flex-col h-full p-8 mt-14 lg:-mt-2">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-bold">Blog API Settings</h1>
        <BlogDashboardForm />
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedBlogType("ghost")}
          className={`px-4 py-2 rounded-[8px] ${
            selectedBlogType === "ghost"
              ? "bg-primary-green text-black"
              : "bg-gray-200"
          }`}
        >
          Ghost
        </button>
        <button
          onClick={() => setSelectedBlogType("wordpress")}
          className={`px-4 py-2 rounded-[8px] ${
            selectedBlogType === "wordpress"
              ? "bg-primary-green text-black"
              : "bg-gray-200"
          }`}
        >
          WordPress
        </button>
      </div>

      <div className="relative overflow-x-auto rounded-lg border">
        <table className="element w-full">
          <thead className="border-b border-gray-300">
            <tr className="text-lg sm:text-xl font-bold">
              <th className="px-6 py-3 text-left">URL</th>
              {selectedBlogType === "ghost" ? (
                <th className="px-6 py-3 text-left">API Key</th>
              ) : (
                <>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Password</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {selectedBlogType === "ghost" && ghostData.length > 0 ? (
              ghostData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 border border-b-gray-200 cursor-pointer`}
                >
                  <td
                    title="item.URL"
                    className="px-6 py-3 text-base font-medium max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] text-wrap"
                  >
                    {item.URL}
                  </td>
                  <td className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate px-6 py-3 text-base font-medium text-primary-green">
                    {item.ghostApi}
                  </td>
                </tr>
              ))
            ) : selectedBlogType === "wordpress" && wordpressData.length > 0 ? (
              wordpressData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 border border-b-gray-200 cursor-pointer`}
                >
                  <td className="px-6 py-3 text-base font-medium">
                    {item.URL}
                  </td>
                  <td className="px-6 py-3 text-base font-medium">
                    {item.username}
                  </td>
                  <td className="px-6 py-3 text-base font-medium">
                    {item.password}
                  </td>
                </tr>
              ))
            ) : (
              // Display "No details" message if no data is available
              <tr>
                <td
                  colSpan={selectedBlogType === "ghost" ? 2 : 3}
                  className="px-6 py-20 text-center text-gray-500"
                >
                  No details
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogDashboardTable;
