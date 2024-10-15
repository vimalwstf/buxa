"use client";

import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { logIn, UserType } from "@/lib/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
export default function UpWriter() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const accessToken = session?.user?.accessToken;
  let user = null;
  if (!!accessToken) {
    const { id, name, email, firstName, lastName, image, credits } =
      session.user!;
    user = { id, name, email, firstName, lastName, image, credits };
  }
  useEffect(() => {
    if (!!accessToken) {
      dispatch(logIn(user as UserType));
    }
  }, [accessToken, dispatch, user]);

  return (
    <main className="bg-custom-gradient h-screen">
      <ProtectedRoute render={<Dashboard />} />
    </main>
  );
}
