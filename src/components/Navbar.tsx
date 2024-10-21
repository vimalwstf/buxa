"use client";

import MainNavbar from "./MainNavbar";
import LandingNavbar from "./LandingNavbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const onDashboard = pathName === "/dashboard";

  if (onDashboard) return <MainNavbar />;

  return <LandingNavbar />;
};
export default Navbar;
