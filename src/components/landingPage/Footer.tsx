"use client";
import React from "react";
import Logo from "../../../public/images/buxa_logo.svg";
import Image from "next/image";
import Link from "next/link";
import Instagram from "../../../public/images/socials/Instagram.svg";
import Twitter from "../../../public/images/socials/Twitter.svg";
import Facebook from "../../../public/images/socials/Facebook.svg";
import Youtube from "../../../public/images/socials/Youtube.svg";
import { usePathname } from "next/navigation";

import playStore from "../../../public/images/playstore.svg";
import { FaApple } from "react-icons/fa6";

const socialIcons = [
  { name: "Instagram", link: "", src: Instagram },
  { name: "Twitter", link: "", src: Twitter },
  { name: "Facebook", link: "", src: Facebook },
  // { name: "Linkedin", link: "", src: Linkedin },
  { name: "Youtube", link: "", src: Youtube },
];

const quickLinks = [
  { item: "Support", link: "/" },
  { item: "Pricing", link: "/" },
  { item: "Tutorials", link: "/" },
  { item: "Affiliates", link: "/" },
];

const company = [
  { item: "Team", link: "/" },
  { item: "Privacy Policy", link: "/" },
  { item: "Terms of Services", link: "/" },
];

const Footer = () => {
  const pathName = usePathname();
  const onDashboard = pathName === "/dashboard";

  return !onDashboard ? (
    <div className="container-wrapper py-10  ">
      <footer className=" bg-gray-900 content-container flex-col lg:flex-row rounded-xl text-white p-10 mb-10  text-center  sm:text-start">
        <div className=" mx-auto md:flex   ">
          <div className="mb-10 md:mb-0 md:w-1/2">
            <div className="flex flex-col  justify-center items-center md:items-start">
              <div className="text-2xl font-bold text-green-500">
                <Link className="flex" href="/">
                  <Image src={Logo} width={100} height={100} alt="" />
                </Link>
              </div>
              <p className="mt-4  md:w-3/4 opacity-50 flex flex-col gap-1">
                <span>
                  Crafting Content for the Future <br />
                </span>
                <span>
                  Creating smarter content that ranks, informs, and excites.
                  Trusted by creators from around the world.
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center sm:items-start sm:justify-start gap-10   mb-8 md:mb-2 px-4">
            <div className="md:w-1/5 flex flex-col items-center">
              <h3 className="font-bold text-xl text-nowrap">Quick Links</h3>
              <ul className="mt-2 space-y-4 ">
                {quickLinks.map((item, i) => (
                  <li key={i}>
                    <Link href={item.link} className="text-white">
                      {item.item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/5 flex flex-col text-center">
              <h3 className="font-bold text-xl">Company</h3>
              <ul className="mt-2 space-y-2 text-center">
                {company.map((item, i) => (
                  <li key={i}>
                    <Link href={item.link} className="text-white">
                      {item.item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" md:w-3/5">
              <h3 className="font-bold text-xl text-nowrap">Get It Free</h3>
              <p className="mt-2 opacity-50">
                Our product is exclusive — claim your spot today.
              </p>

              <div className="mt-7 md:static">
                <div className="flex flex-col lg:flex-row gap-4">
                  <button className="flex items-center bg-black p-2 pr-4 gap-4 rounded-md min-w-[200px] w-full md:w-auto">
                    <Image src={playStore} alt="playStore" height={40} />
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] text-text-third p-0">
                        GET IT ON
                      </span>
                      <span className="text-[18px] p-0">Google Play</span>
                    </div>
                  </button>
                  <button className="flex items-center bg-black p-2 pr-4 gap-4 rounded-md min-w-[200px] w-full md:w-auto">
                    <FaApple size={40} />
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] text-text-third p-0">
                        Download on the
                      </span>
                      <span className="text-[18px] p-0">App Store</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center md:justify-start items-center mb-10 gap-4">
          {socialIcons.map((icon, i) => {
            return (
              <Link href="icon.link" key={i} className="text-white ml-4">
                <Image src={icon.src} width={20} height={20} alt={icon.name} />
              </Link>
            );
          })}
        </div>
        <div className="text-center md:w-full opacity-50">
          <p className="">
            Copyright © 2023{" "}
            <Link href="" className="border-b">
              Buxa.ai Inc. All rights reserved.
            </Link>
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <></>
  );
};

export default Footer;
