import { signIn } from "next-auth/react";

export default function GoogleSignup() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }, { prompt: "login" });
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
