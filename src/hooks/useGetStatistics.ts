import { useEffect, useState } from "react";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { DocumentInfo, DataObject } from "@/types/type";
import useLocalStorage from "./useLocalStorage";

interface Props {
  setDocuments: (documents: DocumentInfo[]) => void;
}
const useGetStatistics = (setStats: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const { value: user } = useLocalStorage("user", { accessToken: "" });

  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchStats = async () => {
      if (accessToken) {
        console.log("------data---------", accessToken);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/user/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            },
          );
          if (response?.data?.status) {
            const data: any = response.data.data;

            console.log("------data---------", data);

            setStats(data);
          }
        } catch (error) {
          console.log("document fetch", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStats();
  }, [accessToken, setStats]);

  return { isLoading };
};

export default useGetStatistics;
