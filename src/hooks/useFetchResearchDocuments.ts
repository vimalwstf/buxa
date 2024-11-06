import { useEffect, useState } from "react";
import axios from "axios";
import { Research } from "@/app/(tools)/research/page";
import useLocalStorage from "./useLocalStorage";

interface Props {
  setDocuments: (documents: Research[]) => void;
}
const useFetchResearchDocuments = (setDocuments: Props["setDocuments"]) => {
  const [isLoading, setIsLoading] = useState(true);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchDocuments = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/research`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            },
          );
          if (response?.data?.status) {
            const data: Research[] = response.data.data.map((doc: Research) => {
              return {
                id: doc.id,
                content: doc.content,
                updatedAt: doc.updatedAt,
                isFavorite: doc.isFavorite,
              };
            });
            data.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            );
            setDocuments(data);
          }
        } catch (error) {
          console.log("document fetch", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDocuments();
  }, [accessToken, setDocuments]);

  return { isLoading };
};

export default useFetchResearchDocuments;
