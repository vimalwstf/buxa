"use client";

import DashboardNavbar from "./DashboardNavbar";
import LandingNavbar from "./landingPage/LandingNavbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const onDashboard = pathName === "/dashboard";

  if (onDashboard) return <DashboardNavbar />;

  return (
    <div className="fixed top-0 z-10 w-full">
      <LandingNavbar />
    </div>
  );
};
export default Navbar;
