import { useState, useEffect } from "react";
import axios from "axios";
export const useGetData = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error:unknown) {
        if(axios.isAxiosError(error)) {
            // AxiosError type
            setError(error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};