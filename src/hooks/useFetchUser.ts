import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "@/lib/user/userSlice";
import  useLogout  from "./useLogout";
// import { useSession } from "next-auth/react";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout  = useLogout();
  // const {data: session} = useSession();
  // const accessToken = session?.user?.accessToken;

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const accessToken = parsedUser?.accessToken;

  const fetchUser = async () => {
    if (accessToken) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );
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

  useEffect(() => {
    fetchUser();
  }, [accessToken, dispatch, handleLogout]);

  

  return { isLoading };
};

export default useFetchUser;
