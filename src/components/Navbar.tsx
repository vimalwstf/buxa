"use client";

import InnerNavbar from "./InnerNavbar";
import LandingNavbar from "./landingPage/LandingNavbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const onDashboard = pathName === "/dashboard";

  if (onDashboard) return <InnerNavbar />;

  return (
    <div className="fixed top-0 z-10 w-full">
      <LandingNavbar />
    </div>
  );
};
export default Navbar;
