"use client";

import { useState } from "react";

import PublishSubmit from "@/components/ui/PublishSubmit";

const data = {
  ghost: {
    name: "Ghost",
    description: "Ghost is a free, open-source blogging platform.",
    url: "https://ghost.org/",
  },
  wordpress: {
    name: "WordPress",
    description:
      "WordPress is a free and open-source content management system.",
    url: "https://wordpress.org/",
  },
};

const Data = [
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
  { url: "qwertyuiop", apiKey: "asdfghjkl" },
];

const Page = () => {
  const [selected, setSelected] = useState<"ghost" | "wordpress">("ghost");

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <h1 className="text-center text-4xl font-bold text-text-light">
        Settings
      </h1>

      <ul>
        {Data.map(({ url, apiKey }, index) => (
          <li key={index} className="flex gap-4">
            <span>{url}</span>
            <span>{apiKey}</span>
            <button className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>

      <>
        <h3 className="text-text-light">Select a blogging platform</h3>
        <div className="flex gap-2">
          <label className="text-text-light">
            <span>Wordpress</span>
            <input
              required
              type="radio"
              name="radio"
              value="wordpress"
              onChange={() => setSelected("wordpress")}
            />
          </label>

          <label className="text-text-light">
            <span>Ghost</span>
            <input
              required
              type="radio"
              name="radio"
              value="ghost"
              onChange={() => setSelected("ghost")}
            />
          </label>
        </div>
      </>
      <form className="element w-full max-w-md aspect-video flex flex-col justify-between rounded-md bg-primary-light p-4">
        <div className="flex flex-col gap-2">
          {selected === "ghost" && <Ghost />}
          {selected === "wordpress" && <Wordpress />}
        </div>
        <PublishSubmit disabled={false} loading={false} />
      </form>
    </div>
  );
};

function Ghost() {
  return (
    <>
      <input required name="apiKey" type="text" placeholder="Enter api key" />
      <input required name="url" type="url" placeholder="Enter your url" />
    </>
  );
}

function Wordpress() {
  return (
    <>
      <input
        required
        name="username"
        type="text"
        placeholder="Enter username"
      />
      <input
        required
        name="password"
        type="text"
        placeholder="Enter password"
      />
      <input required name="url" type="url" placeholder="Enter your url" />
    </>
  );
}

export default Page;
