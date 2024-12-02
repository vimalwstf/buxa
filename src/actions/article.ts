"use server";

import axios from "axios";
import { getAccessToken } from "./accessToken";
import { redirect } from "next/navigation";
import { handleError } from "./helper";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  favourite: boolean;
};

const BackendURL = process.env.NEXT_PUBLIC_SOURCE_URL;

export async function getArticles() {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`${BackendURL}/documents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    });

    const data: Article[] = response.data.data.map(
      (doc: {
        id: string;
        content: string;
        wordCount: number;
        updatedAt: string;
        isFavorite: boolean;
      }) => ({
        id: doc?.id,
        name: doc?.content,
        words: doc?.wordCount,
        modified: doc?.updatedAt,
        favourite: doc?.isFavorite,
      }),
    );

    data.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return {
      status: 200,
      data: data,
      message: "Articles fetched successfully.",
    };
  } catch (error) {
    await handleError(error as Error, "Error fetching documents");
  }
}

export async function updateArticle(id: string, content: string) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${BackendURL}/documents/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
      },
    );

    return {
      status: 200,
      data: response.data.data,
      message: "Article updated successfully.",
    };
  } catch (error) {
    await handleError(error as Error, "Error updating article");
  }
}
