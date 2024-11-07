import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export type StatDocs = {
  content: string;
  documentType: string;
  createdAt: string;
};

export type Stats = {
  credits: number;
  usedCredits: number;
  totalContent: number;
  totalResearch: number;
  totalAlerts: number;
  coc: number;
  cor: number;
  coa: number;
  documents: StatDocs[];
};

const useGetStatistics = () => {
  const [stats, setStats] = useState<Stats>();
  const [isLoading, setIsLoading] = useState(true);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchStats = async () => {
      if (accessToken) {
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
            const {
              credits,
              usedCredits,
              totalContent,
              totalResearch,
              totalAlerts,
              coc,
              cor,
              coa,
              documents,
            }: Stats = response.data.data;

            setStats({
              credits,
              usedCredits,
              totalContent,
              totalResearch,
              totalAlerts,
              coc,
              cor,
              coa,
              documents,
            });
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

  return { isLoading, stats };
};

export default useGetStatistics;
