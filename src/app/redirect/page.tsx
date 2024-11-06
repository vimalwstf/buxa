"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import { logIn } from "@/lib/user/userSlice";
import Loading from "../loading";

interface Credentials {
  firstName: string;
  lastName: string;
  id: string;
  credits: number;
  email: string;
}

function GoogleRedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  let user: any;
  user = params.get("user");
  if (user) {
    user = JSON.parse(user);
  }
  console.log(user)
//   const redirectRoute = "/";
  const getMe = async () => {
    if (user) {
      let credentials: Credentials = {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        id: user?.id ?? "",
        credits: user?.credits ?? "",
        email: user?.email ?? "",
      };

      localStorage.setItem("user",JSON.stringify(user));

      dispatch(logIn(credentials));
        router.push("/write");
    }
  };

  useEffect(() => {
    getMe();
  }, [router]);

  return (
    <>
      <Loading />
    </>
  );
}

function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <GoogleRedirectPage />
    </Suspense>
  );
}

export default Page;
