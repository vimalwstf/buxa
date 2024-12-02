import axios from "axios";

const BackendURL = process.env.NEXT_PUBLIC_SOURCE_URL;

async function apiDash(accessToken: string) {
  try {
    const response = await axios.get(`${BackendURL}/documents/blog`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    });

    if (!response.data.status) {
      throw new Error(response.data.error || "An error occurred.");
    }

    return response.data.data;
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching api data:", error.message);
    return error.message || "Failed to fetch api data.";
  }
}

export { apiDash };
