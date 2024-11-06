"use client";
import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";
import Loader from "@/components/Loader";
// import useFetchUser from "@/hooks/useFetchUser";
import StatLevel from "@/components/dashboard/StatLevel";
import MobileNav from "@/components/dashboard/MobileNav";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "@/lib/hooks";
// import { logIn } from "@/lib/user/userSlice";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const TokenVerify = async () => {
//   const accessToken = localStorage.getItem("token");
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_SOURCE_URL}/user`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "ngrok-skip-browser-warning": true,
//         },
//       }
//     );
//     return response;
//   } catch (err: any) {
//     return err.message;
//   }
// };

export default function Dashboard() {
  // const [callCount, setCallCount] = useState(0);
  // const dispatch = useDispatch();
  // const user = useAppSelector((state) => state.user.user);
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // fetch user profile data

  // const checkUser = async () => {
  //   if (typeof window != "undefined") {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await TokenVerify();
  //       console.log("data", data);
  //       if (data?.status) {
  //         dispatch(logIn(data?.data));
  //         setCallCount(1);
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //       }
  //     } else {
  //       setIsLoading(false);
  //       // router.push("/")
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     if (callCount === 1) {
  //       if (user != null) {
  //         setIsLoading(false);
  //       } else {
  //         router.push("/");
  //         setIsLoading(false);
  //       }
  //     } else {
  //       if (user != null) {
  //         setIsLoading(false);
  //       } else {
  //         checkUser();
  //       }
  //     }
  //   }
  // }, [callCount]);

  const { isLoading, checkUser } = useAuth();

  
  // const loggedIn = localStorage.getItem("");
  // const user = localStorage.getItem("user");
  // const parsedUser = user ? JSON.parse(user) : null;
  // const loggedIn = parsedUser?.accessToken;

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col mx-auto md:mr-5">
        <Navbar />
        <div className="fixed top-0 z-20 w-full ">
          <MobileNav />
        </div>

        {isLoading ? (
          <div className="flex mx-auto justify-center items-center h-[90vh]">
            <Loader />
          </div>
        ) : (
          <div className="flex-col md:flex-row flex mt-14 lg:mt-0">
            <div className="flex-1 flex flex-col">
              <Stats />
              <StatLevel />
              <Table />
            </div>
            <Alerts />
          </div>
        )}
      </div>
    </div>
  );
}
