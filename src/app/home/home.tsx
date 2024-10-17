"use client";
import MainNavbar from "@/components/MainNavbar";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Features from "@/components/Features";
import { logIn, UserType } from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (!!accessToken) {
      dispatch(logIn(session?.user?.userData as UserType));
    }
  }, [accessToken, session?.user?.userData, dispatch]);

  return <AppContent />;
}

function AppContent() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <main className="bg-custom-gradient h-screen">
      <MainNavbar />
      <Dashboard />
    </main>
  ) : (
    <main>
      <LandingNavbar />
      <Hero />
      <WhyChooseUs />
      <About />
      <Features />
      <Footer />
    </main>
  );
}
