import React from "react";
// import GoogleSignup from "../GoogleSignup";
// import Link from "next/link";
import { handleSignIn } from "../GoogleSignup";
// import Image from "next/image";
// import Hamburger from "../../public/images/Hamburger.svg";

function WhyChooseUs() {
  const features = [
    {
      title: "Instant Replies",
      desc: "Confidently respond to emails, messages, comments and more in an instant on mobile & desktop.",
    },
    {
      title: "Effortless Writing",
      desc: "Beat write's block, defeat looming deadlines and writing differences all with one click.",
    },
    {
      title: "Flawless Grammar",
      desc: "Work smarter with impossible-seeming grammar, spelling and vocabulary.",
    },
  ];

  return (
    <div className="container-wrapper ">
      <section className="content-container flex flex-col  space-y-8  md:flex-row justify-between bg-blue-00 items-center gap-x-12  py-20">
        <h2 className="text-4xl leading-snug md:text-7xl font-bold">
          The AI Writer <br /> Only For You
        </h2>
        <div className="md:text-left text-center w-2/3 md:w-1/2">
          <button
            // href="/"
            onClick={handleSignIn}
            className="  from-[#7C67F9] to-[#8AD467] hover:scale-110 ease-in-out duration-150 bg-gradient-to-r p-2 mb-2 rounded-md text-2xl md:text-3xl font-semibold"
          >
            Try Buxa AI{" "}
          </button>

          <p className=" text-lg  md:text-xl">
            The world&apos;s first ChatGPT-powered AI writing app and keyboard
            extension to generate text, email and more - in your voice -
            everywhere you write. Cut the cost of writing tools instantly and
            affordably!
          </p>
        </div>
      </section>
      <section className="content-container flex relative justify-center  space-x-8 py-10">
        <div className="bg-[--primary-color-blue] flex flex-col justify-around   relative p-6 rounded-lg">
          {/* <img
              src="https://placehold.co/200x200"
              alt="Person using AI writing assistant"
              className="mx-auto"
            /> */}
          <h3 className="text-4xl mb-6 md:text-5xl text-center font-bold">
            Why Choose Us?
          </h3>
          <div className="flex flex-col justify-center items-center md:flex-row  h-4/5 ">
            {features.map(({ title, desc }, i) => (
              <div
                key={i}
                className="text-center min-h-max h-full bg-gradient-to-b from-neutral-700 to-neutral-950 shadow-neutral-300 drop-shadow-2xl shadow-inner rounded-3xl w-2/3 md:w-1/3 p-4 md:px-8 md:py-8 m-6 "
              >
                <p className=" text-2xl font-semibold">{title}</p>
                <p className="  text-lg opacity-50">{desc}</p>
              </div>
            ))}
          </div>
          {/* <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-transparent border-r-[50px] border-r-purple-600"></div> */}
        </div>
      </section>
    </div>
  );
}

export default WhyChooseUs;
