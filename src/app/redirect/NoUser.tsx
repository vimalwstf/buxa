"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NoUser() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });
  return <p>No user found</p>;
}
