import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full">
        <div>
          <Link href='/login'> login</Link>
          <Link href='/register'>register</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
