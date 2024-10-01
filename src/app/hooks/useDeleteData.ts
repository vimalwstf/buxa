import { useState } from "react";
import axios from "axios";
export const useDelete = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      setData(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosError type
        setError(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, deleteData };
};
