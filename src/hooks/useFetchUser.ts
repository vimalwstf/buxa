import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "@/lib/user/userSlice";
import useLogout from "./useLogout";
import useLocalStorage from "./useLocalStorage";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = useLogout();

  const { value: user, setValue: setUser } = useLocalStorage("user", {
    accessToken: "",
    credits: 0,
    blogUrl: "",
    userBlogApiKey: "",
  });
  const accessToken = user?.accessToken;

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
          },
        );
        if (response?.data?.status) {
          const updatedUser = user;
          updatedUser.credits = response?.data?.data?.credits;
          updatedUser.blogUrl = response?.data?.data?.blogUrl;
          updatedUser.userBlogApiKey = response?.data?.data?.userBlogApiKey;
          setUser(updatedUser);

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
