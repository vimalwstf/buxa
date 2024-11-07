import { useEffect, useState } from "react";
import axios from "axios";
import { DocumentInfo, DataObject } from "@/types/type";
import useLocalStorage from "./useLocalStorage";

interface Props {
  setDocuments: (documents: DocumentInfo[]) => void;
}
const useFetchWriterDocuments = (setDocuments: Props["setDocuments"]) => {
  const [isLoading, setIsLoading] = useState(true);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchDocuments = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            },
          );
          if (response?.data?.status) {
            const data: DocumentInfo[] = response.data.data.map(
              (doc: DataObject) => {
                return {
                  id: doc.id,
                  name: doc.content,
                  words: doc.words,
                  modified: doc.updatedAt,
                  favourite: doc.isFavorite,
                };
              },
            );
            data.sort(
              (a, b) =>
                new Date(b.modified).getTime() - new Date(a.modified).getTime(),
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

export default useFetchWriterDocuments;
