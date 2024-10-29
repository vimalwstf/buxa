"use client";
import Hero from "@/components/landingPage/Hero";
import WhyChooseUs from "@/components/landingPage/WhyChooseUs";
import About from "@/components/landingPage/About";
import Features from "@/components/landingPage/Features";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <About />
      <Features />
    </main>
  );
}
