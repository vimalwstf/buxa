import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export const handleSignIn = async () => {
  await signIn("google", { callbackUrl: "/dashboard" }, { prompt: "login" });
};

export default function GoogleSignup() {
  return (
    <button
      onClick={handleSignIn}
      // onClick={() => console.log("clicked")}
      className="flex items-center gap-1 sm:gap-2 sm:text-lg font-medium p-1 sm:px-2 sm:py-1 md:px-4 md:py-2 "
    >
      <FcGoogle className="drop-shadow-2xl drop" />
      <div className="flex items-center justify-center">
        <span>SignIn&nbsp;</span>
        <span className="hidden sm:inline text-nowrap"> with Google</span>
      </div>
    </button>
  );
}
