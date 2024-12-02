"use server";

import axios from "axios";
import { getAccessToken } from "./accessToken";
import { User } from "@/types/type";
import { handleError } from "./helper";

const BackendURL = process.env.NEXT_PUBLIC_SOURCE_URL;

export async function getUser() {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${BackendURL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data as User;
  } catch (error) {
    await handleError(error as Error, "Error fetching user");
  }
}
