"use client";

import { setAccessToken } from "@/actions/accessToken";
import { logIn } from "@/lib/user/userSlice";
import { User } from "@/types/type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../loading";

export default function SetUser({ userData }: { userData: User }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const getMe = async () => {
    const credentials = {
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      id: userData?.id ?? "",
      credits: userData?.credits ?? 0,
      email: userData?.email ?? "",
      blogUrl: userData?.blogUrl ?? "",
      userBlogApiKey: userData?.userBlogApiKey ?? "",
      accessToken: userData?.accessToken ?? "",
    };

    localStorage.setItem("user", JSON.stringify(credentials));

    await setAccessToken(userData.accessToken);

    dispatch(logIn(credentials));

    router.push("/article");
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
