"use client";

// import { useState } from "react";

import SettingsForm from "@/components/tools/SettingsForm";

const Data = [
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
];

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <h1 className="text-center text-4xl font-bold text-text-light">
        Settings
      </h1>
      <SettingsForm />
      <ul className="flex flex-col gap-4 w-full max-w-md bg-gray-200">
        {Data.map(({ url, apiKey }, index) => (
          <li key={index} className="flex gap-4">
            <span>{url}</span>
            <span>{apiKey}</span>
            <button className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>

      {/* <>

      </>
      <form className="element w-full max-w-md aspect-video flex flex-col justify-between rounded-md bg-primary-light p-4">

        <PublishSubmit disabled={false} loading={false} />
      </form> */}
    </div>
  );
};

export default Page;
