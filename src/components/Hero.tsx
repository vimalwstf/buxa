// import React from "react";
// import Image from "next/image";
// // import heroImg1 from "../../public/images/bg-images/hero-image-1.png";
// import lex from "../../public/images/brandLogos/lex.svg";
// import astrix from "../../public/images/brandLogos/astrix.svg";
// import btc from "../../public/images/brandLogos/btc.svg";
// // import DownArrow from "../../public/images/DownArrow.svg";
// import Hero2 from "../../public/images/hero2.svg";
// import Hero1 from "../../public/images/hero1.svg";
// import HeroGlobe from "../../public/images/HeroGlobe.png";
// // import LandingHero from "../../public/images/LandingHero.svg";

// import Link from "next/link";

// const Hero = () => {
//   return (
//     <div className="max-w-[1920px] mx-auto">
//       <section className="content-container space-x-6 py-10 mx-auto">
//         <div className="flex text-6xl sm:text-[5.34rem] lg:text-9xl md:text-start text-center font-bold space-x-4 mx-auto ">
//           <div className="flex flex-col ">
//             <div className="">
//               <h1>
//                 Best <span className="text-primary-green">Writing</span>{" "}
//                 Assistant
//               </h1>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center gap-8">
//               <div> Software</div>
//               <div
//                 className="inline-flex items-center"
//               >
//                 <div className=" flex justify-center items-center space-x-6 w-full lg-w-auto">
//                   <div className="relative w-[60px] flex justify-center h-[60px] md:w-[100px] md:h-[100px]">
//                     <Image className="inline" src={HeroGlobe} alt="Globe" />
//                   </div>
//                   <p className="-top-20  text-lg font-thin tracking-widest inline-flex flex-col">
//                     <span>Much more than those </span>
//                     <span> repetitive basic AI copywriter.</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="content-container flex justify-center flex-row  items-center">
//         {/* <Image
//           src={LandingHero}
//           alt="Hero"
//           // objectFit="cover"
//           height={400}
//         /> */}
//         <div className="max-w-[95%] relative w-[50%]">
//           <Image
//             src={Hero1}
//             alt="Description of the image"
//             // objectFit="cover"
//             // height={450}
//             // width={1000}
//           />
//         </div>
//         <div className="relative w-[50%]">
//           <Image
//             src={Hero2}
//             alt="Graph showing system activity"
//             className="mx-auto"
//             // objectFit="contain"
//             // height={220}
//             // height={450}
//             // width={400}
//           />
//           {/* <div className="h-[25%] w-[25%] flex justify-end items-start absolute object-contain top-0 right-0">
//             <Image
//               src={DownArrow}
//               alt="Graph showing system activity"
//               className="w-full"
//               objectFit="contain"
//               // height={120}
//               // width={110}
//             />
//           </div> */}
//           {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-transparent border-l-[50px] border-l-green-500"></div> */}
//         </div>
//       </section>
//       <div className="content-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center pt-10 md:pt-20">
//         <Link href="https://app.astrix.live/" target="_blank">
//           <Image src={astrix} alt="astrix logo" width={190} height={190} />
//         </Link>
//         <Link href="https://btcwires.com/" target="_blank">
//           <Image src={btc} alt="btc logo" width={190} height={190} />
//         </Link>
//         <Link href="https://lex.live/" target="_blank">
//           <Image src={lex} alt="lexai logo" width={190} height={190} />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import Image from "next/image";
// import heroImg1 from "../../public/images/bg-images/hero-image-1.png";
import lex from "../../public/images/brandLogos/lex.svg";
import astrix from "../../public/images/brandLogos/astrix.svg";
import btc from "../../public/images/brandLogos/btc.svg";
// import DownArrow from "../../public/images/DownArrow.svg";
import Hero2 from "../../public/images/hero2.svg";
import Hero1 from "../../public/images/hero1.svg";
import HeroGlobe from "../../public/images/HeroGlobe.png";
// import LandingHero from "../../public/images/LandingHero.svg";

import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-[1920px] mx-auto pt-[3.5rem] md:pt-[5rem]">
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
        {/* <div className="flex text-5xl sm:text-[5.34rem] lg:text-[8.5rem] md:text-start text-center font-bold space-x-4 mx-auto ">
          <div className="flex flex-col relative">
            <div className=" flex flex-col md:flex-row md:justify-center  md:mb-5">
              <h1>
                The <span className="text-primary-green">Expert</span> AI
                Article <br /> Writer
                
              </h1>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-1/2 lg-w-auto">
              <div className="relative w-[40px] flex justify-center h-[40px] bg-gray-50 sm:w-[100px] sm:h-[100px] p-1">
                <Image className="inline" src={HeroGlobe} alt="Globe" />
              </div>
              <p className="text-sm sm:text-lg md:text-lg font-thin tracking-widest inline-flex flex-col w-[90%] md:w-4/5">
                Your AI for tailored content, precise research, and
                SEO/SMO-optimized articles. Say goodbye to tedious tasks and
                hello to efficiency!
              </p>
              </div>
            </div>
          </div>
        </div> */}
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
