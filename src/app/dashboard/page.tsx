"use client";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { logIn, logOut } from "@/lib/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { signOut } from "next-auth/react";
import axios from "axios";
import ProtectedRoute from "../protected/ProtectedRoute";
import Loader from "@/components/Loader";
// import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const accessToken = session?.user?.accessToken;
  const [isLoading, setIsLoading] = useState(true);

  //user fetch
  useEffect(() => {
    const fetchUser = async () => {
      // console.log("accessToken", accessToken);
      if (accessToken) {
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
          } else {
            if (response.status === 400) {
              dispatch(logOut());
              await signOut();
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // Set loading to false once the check is done
      }
    };
    fetchUser();
  }, [accessToken, dispatch]);
  if (isLoading) {
    return <Loader />;
  }
  return <ProtectedRoute render={<Dashboard />} />;
}
