import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignup() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }, { prompt: "login" });
  };

  return (
    <button onClick={handleSignIn} className="flex items-center gap-2">
      <FcGoogle />
      <div className="flex gap-1">
        <span>SignIn&nbsp;</span>
        <span className="hidden sm:inline">with Google</span>
      </div>
    </button>
  );
}
