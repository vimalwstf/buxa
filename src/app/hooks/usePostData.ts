import { useState,useEffect } from "react";
import axios from "axios";
export const usePostData = (url: string, data: object) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(url, data);
        setResponse(res.data);
      } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            // AxiosError type
            setError(error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, data]);
  return { response, error, loading };
};