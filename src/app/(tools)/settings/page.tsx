import PublishSubmit from "@/components/ui/PublishSubmit";
import React from "react";

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

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <h1 className="text-center text-4xl font-bold text-text-light">
        Settings
      </h1>

      <form className="element w-full max-w-md aspect-video flex flex-col justify-between rounded-md bg-primary-light p-4">
        <div>
          <h2 className="text-[1.3rem] font-semibold mb-4 text-text-light"></h2>
          <input type="text" placeholder="Enter your name" />
        </div>
        <PublishSubmit disabled={false} loading={false} />
      </form>
    </div>
  );
};

export default Page;
