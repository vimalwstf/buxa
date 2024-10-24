"use client";

import MainNavbar from "./DashboardNavbar";
import LandingNavbar from "./landingPage/LandingNavbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const onDashboard = pathName === "/dashboard";

  if (onDashboard) return <MainNavbar />;

  return <LandingNavbar />;
};
export default Navbar;
