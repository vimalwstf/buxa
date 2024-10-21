"use client";

import MainNavbar from "./MainNavbar";
import LandingNavbar from "./LandingNavbar";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.accessToken;
  return isLoggedIn ? <MainNavbar /> : <LandingNavbar />;
};
export default Navbar;
