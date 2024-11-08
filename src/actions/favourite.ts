"use server";

import axios from "axios";

const BackendURL = process.env.NEXT_PUBLIC_SOURCE_URL;

export async function toggleFavourite(accessToken: string, id: string) {
  try {
    const response = await axios.put(`${BackendURL}/documents/${id}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data.status) {
      throw new Error(response.data.error || "An error occurred.");
    }

    return response.data;
  } catch (err) {
    const error = err as Error;
    console.error("Error toggling favourite:", error.message);
    return error.message || "Failed to update the favourite status.";
  }
}
