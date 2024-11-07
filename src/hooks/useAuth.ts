// hooks/useAuth.js
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { logIn } from "@/lib/user/userSlice";
import useLocalStorage from "./useLocalStorage";

const TokenVerify = async () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const token = parsedUser.accessToken;

  // const accessToken = localStorage.(token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      },
    );
    return response;
  } catch (err) {
    const error = err as Error;
    return error.message;
  }
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [callCount, setCallCount] = useState(0);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const checkUser = async () => {
    if (accessToken) {
      let data: any = await TokenVerify();

      if (data?.status) {
        dispatch(logIn(data?.data));
        setCallCount(1);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (callCount === 1) {
      setIsLoading(false);
    } else {
      checkUser();
    }
  }, [callCount]);

  return { isLoading, checkUser };
};
