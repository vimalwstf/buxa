"use client";

import { apiDash } from "@/actions/apiDash";
// import { useState } from "react";

import SettingsForm from "@/components/tools/SettingsForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

const Data = [
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
];

const Page = () => {
  const { value: user } = useLocalStorage("user", {
    accessToken: "",
  });

  const { value: apiData, setValue: setApiData } = useLocalStorage("apiData", {
    ghostBlogs: [],
    wordpressBlogs: [],
  });

  const accessToken = user?.accessToken;

  useEffect(() => {
    if (accessToken) {
      apiDash(accessToken).then((res) => {
        const ghostBlogs = res
          .filter((item) => item.blogType === "ghost")
          .map((item) => {
            const url = item.blogSite.ghostURL;
            const apiKey = item.blogSite.ghostApi;
            return { url, apiKey };
          });

        const wordpressBlogs = res
          .filter((item) => item.blogType === "wordpress")
          .map((item) => {
            const url = item.blogSite.URL;
            const apiKey = item.blogSite.password;
            return { url, apiKey };
          });

        setApiData({ ghostBlogs, wordpressBlogs });
      });
      // console.log("Ghost Blogs:", ghostBlogs);
      // console.log("WordPress Blogs:", wordpressBlogs);

      // console.log(Data);
    }
  }, [accessToken]);

  return (
    <div className="w-full flex flex-col justify-center bg-primary-light/80 h-full p-8">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-4xl font-bold">Blog API Settings</h1>
        <SettingsForm />
      </div>
      <div className="relative overflow-x-auto rounded-lg border">
        <table className="element w-full border">
          <tr className="border text-3xl font-bold">
            <th>URL</th>
            <th>API Key</th>
          </tr>
          <tbody className="text-center">
            {[...Data, ...Data, ...Data].map((item, index) => (
              <tr key={index} className="border">
                <td className="  text-xl font-medium">{item.url}</td>
                <td className="  text-xl font-medium">{item.apiKey}</td>
                <td className="  text-xl font-medium">DELETE</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
