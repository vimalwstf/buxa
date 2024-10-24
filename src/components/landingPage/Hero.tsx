import React from "react";
import Image from "next/image";
// import heroImg1 from "../../public/images/bg-images/hero-image-1.png";
// import lex from "../../public/images/brandLogos/lex.svg";
import lex from "../../../public/images/brandLogos/lex.svg";
import astrix from "../../../public/images/brandLogos/astrix.svg";
import btc from "../../../public/images/brandLogos/btc.svg";
// import DownArrow from "../../public/images/DownArrow.svg";
import Hero2 from "../../../public/images/hero2.svg";
import Hero1 from "../../../public/images/hero1.svg";
import HeroGlobe from "../../../public/images/HeroGlobe.png";
// import LandingHero from "../../public/images/LandingHero.svg";

import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <section className="content-container space-x-6 py-10 mx-auto">
        <div className="flex text-6xl sm:text-[5.34rem] lg:text-9xl md:text-start text-center font-bold space-x-4 mx-auto ">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row gap-8">
              <div>Best</div>
              <div className="text-primary-green">Writing</div>
              <div>Assistant</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div> Software</div>
              <div
                style={{
                  paddingTop: "20px",
                }}
                className="inline-flex -mp-[16px] "
              >
                <div className=" flex justify-center items-center space-x-6">
                  <Image
                    className="inline"
                    src={HeroGlobe}
                    alt="Globe"
                    width={100}
                    height={100}
                  />
                  <p className="-top-20  text-lg font-thin tracking-widest inline-flex flex-col">
                    <span>Much more than those </span>
                    <span> repetitive basic AI copywriter.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content-container flex gap-4 sm:gap-14 justify-center flex-row  items-center">
        {/* <Image
          src={LandingHero}
          alt="Hero"
          // objectFit="cover"
          height={400}
        /> */}
        <div className="max-w-[95%]">
          <Image
            src={Hero1}
            alt="Description of the image"
            // objectFit="cover"
            height={450}
            // width={1000}
          />
        </div>
        <div className="relative">
          <Image
            src={Hero2}
            alt="Graph showing system activity"
            className="mx-auto"
            // objectFit="contain"
            // height={220}
            height={450}
            // width={400}
          />
          {/* <div className="h-[25%] w-[25%] flex justify-end items-start absolute object-contain top-0 right-0">
            <Image
              src={DownArrow}
              alt="Graph showing system activity"
              className="w-full"
              objectFit="contain"
              // height={120}
              // width={110}
            />
          </div> */}
          {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-transparent border-l-[50px] border-l-green-500"></div> */}
        </div>
      </section>
      <div className="content-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center pt-10 md:pt-20">
        <Link href="https://app.astrix.live/" target="_blank">
          <Image src={astrix} alt="astrix logo" width={190} height={190} />
        </Link>
        <Link href="https://btcwires.com/" target="_blank">
          <Image src={btc} alt="btc logo" width={190} height={190} />
        </Link>
        <Link href="https://lex.live/" target="_blank">
          <Image src={lex} alt="lexai logo" width={190} height={190} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
