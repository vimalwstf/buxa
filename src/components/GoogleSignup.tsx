import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";

export const handleSignIn = async () => {
  await signIn("google", { callbackUrl: "/write" }, { prompt: "login" });
};
const url= `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_LINK}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`

export default function GoogleSignup() {
  // const [loading, setLoading] = useState(false);

  return (
    // <button
    //   onClick={() => {
    //     setLoading(true);
    //     handleSignIn();
    //   }}
    //   // onClick={() => console.log("clicked")}
    //   className="flex items-center gap-1 sm:gap-2 sm:text-lg font-medium p-1 sm:px-2 sm:py-1 md:px-4 md:py-2 "
    // >
    //   <FcGoogle className="drop-shadow-2xl drop" />
    //   <div className="flex items-center justify-center">
    //     {loading ? (
    //       <span>Signing in...</span>
    //     ) : (
    //       <>
    //         <span>SignIn&nbsp;</span>
    //         <span className="hidden sm:inline text-nowrap"> with Google</span>
    //       </>
    //     )}
    //   </div>
    // </button>
    <Link href={url} className="p-2 flex gap-1 justify-center items-center">
      <FcGoogle className="drop-shadow-2xl drop" />
      <span>Sign in</span>
      </Link>
  );
}
