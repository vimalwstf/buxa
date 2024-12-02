"use server";

import axios from "axios";
import { redirect } from "next/navigation";

export async function handleError(error: Error, msg: string) {
  if (axios.isAxiosError(error)) {
    const { response } = error;

    if (response?.status === 401) redirect("/");

    console.error(msg + ": ", error.message);
    return {
      status: response?.status || 400,
      data: null,
      message: error.message || "An error occurred during update.",
    };
  }

  console.error("Unexpected error:", error.message);
  return {
    status: 500,
    data: null,
    message: "An unexpected error occurred.",
  };
}
