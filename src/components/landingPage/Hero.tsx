import React from "react";
import Image from "next/image";
import lex from '../../../public/images/brandLogos/lex.svg'
import astrix from "../../../public/images/brandLogos/astrix.svg";
import btc from "../../../public/images/brandLogos/btc.svg";
import Hero2 from "../../../public/images/hero2.svg";
import Hero1 from "../../../public/images/hero1.svg";
import HeroGlobe from "../../../public/images/HeroGlobe.png";

import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-[1920px] mx-auto pt-[0rem] md:pt-[0rem]">
      <section className="content-container space-x-6 py-8 mx-auto">
        <div className="flex flex-col text-center sm:text-start text-6xl sm:text-7xl md:text-9xl px-[1%]">
          <h1>The <span className="text-primary-green">Expert AI</span> Article</h1>
          <div className="flex flex-col gap-9 md:gap-20 sm:flex-row">
            <h1> Writer</h1>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="">
                <Image className="h-[30px] w-[30px] md:h-[60px] md:w-[60px]" src={HeroGlobe} alt="Globe" />
              </div>
              <p className="text-[10px] md:text-base w-[80%]">
                Your AI for tailored content, precise research, and
                SEO/SMO-optimized articles. Say goodbye to tedious tasks and
                hello to efficiency!
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="flex items-center justify-between mx-4 md:mx-[6rem]">
        <div>
          <Image src={Hero1} 
            alt="Description of the image" 
            height={500} 
          />
        </div>
        <div>
          <Image
            src={Hero2}
            alt="Graph showing system activity"
            height={500}
          />
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
