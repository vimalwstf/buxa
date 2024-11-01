import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "@/lib/user/userSlice";
import  useLogout  from "./useLogout";
import { useSession } from "next-auth/react";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout  = useLogout();
  const {data: session} = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        setIsLoading(true);
        try {
          console.log(accessToken)
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": true,
              },
            }
          );
          console.log(response);
          if (response?.data?.status) {
            dispatch(logIn(response?.data?.data));
          } else if (response.status === 400) {
            handleLogout();
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUser();
  }, [accessToken, dispatch, handleLogout]);

  return { isLoading };
};

export default useFetchUser;
