import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { DocumentInfo,DataObject } from "@/types/type";

interface Props {
  setDocuments: (documents: DocumentInfo[]) => void;
}
const useFetchWriterDocuments = (setDocuments: Props["setDocuments"]) => {
  const [isLoading, setIsLoading] = useState(false);
  const {data: session} = useSession();
  const accessToken = session?.user?.accessToken;
  useEffect(() => {
    const fetchDocuments = async () => {
      if (accessToken) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            }
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
              }
            );
            data.reverse();
            setDocuments(data);
          }
        } catch (error) {
          console.log("document fetch", error);
        }finally {
          setIsLoading(false);
        }
      }
    };
    fetchDocuments();
  }, [accessToken,setDocuments]);

  return { isLoading };
};

export default useFetchWriterDocuments;