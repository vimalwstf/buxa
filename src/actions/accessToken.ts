"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAccessToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // if (!accessToken) redirect("/?unauthenticated=true");

  return accessToken;
}

export async function setAccessToken(accessToken: string) {
  const cookieStore = cookies();
  cookieStore.set("accessToken", accessToken, { sameSite: "strict" });
}
