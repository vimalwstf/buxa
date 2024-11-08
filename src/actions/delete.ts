"use server";

import axios from "axios";

const BackendURL = process.env.NEXT_PUBLIC_SOURCE_URL;

export async function deleteDocument(
  accessToken: string,
  id: string,
  index?: number,
) {
  const URL =
    BackendURL + "/documents/" + id + (index ? `?index=${index}` : "");
  try {
    const response = await axios.delete(URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.data.status) {
      throw new Error(response.data.data || "An error occurred.");
    }

    return response.data;
  } catch (err) {
    const error = err as Error;
    console.error("Error deleting document:", error.message);
    return error.message || "Failed to delete the document.";
  }
}
