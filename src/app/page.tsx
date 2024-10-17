// "use client";

// import { SnackbarProvider } from "notistack";
// // import dynamic from "next/dynamic";
// import { SessionProvider } from "next-auth/react";
// import Hero from "@/components/Hero";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import About from "@/components/About";
// import Features from "@/components/Features";

// // const Home = dynamic(() => import("./Home/home"), {
// //   ssr: false,
// // });

// export default function App() {
//   return (
//     <SessionProvider>
//       <SnackbarProvider maxSnack={3}>
//         <main>
//           <Hero />
//           <WhyChooseUs />
//           <About />
//           <Features />
//         </main>
//       </SnackbarProvider>
//     </SessionProvider>
//   );
// }

"use client";

import { SnackbarProvider } from "notistack";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

const Home = dynamic(() => import("./home/home"), {
  ssr: false,
});

export default function App() {
  return (
    <SessionProvider>
      <SnackbarProvider maxSnack={3}>
        <Home />
      </SnackbarProvider>
    </SessionProvider>
  );
}
