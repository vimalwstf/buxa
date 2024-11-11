// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { Suspense, useEffect } from "react";
// import { useDispatch } from "react-redux";

// import { logIn } from "@/lib/user/userSlice";
// import Loading from "../loading";

// interface Credentials {
//   firstName: string;
//   lastName: string;
//   id: string;
//   credits: number;
//   email: string;
// }

// function GoogleRedirectPage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const dispatch = useDispatch();
//   let user: any;
//   user = params.get("user");
//   if (user) {
//     user = JSON.parse(user);
//   }
//   console.log(user)
// //   const redirectRoute = "/";
//   const getMe = async () => {
//     if (user) {
//       let credentials: Credentials = {
//         firstName: user?.firstName ?? "",
//         lastName: user?.lastName ?? "",
//         id: user?.id ?? "",
//         credits: user?.credits ?? "",
//         email: user?.email ?? "",
//       };

//       localStorage.setItem("user",JSON.stringify(user));

//       dispatch(logIn(credentials));
//         router.push("/write");
//     }
//   };

//   useEffect(() => {
//     getMe();
//   }, [router]);

//   return (
//     <>
//       <Loading />
//     </>
//   );
// }

// function Page() {
//   return (
//     // You could have a loading skeleton as the `fallback` too
//     <Suspense>
//       <GoogleRedirectPage />
//     </Suspense>
//   );
// }

// export default Page;

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { logIn } from "@/lib/user/userSlice";
import Loading from "../loading";

export interface Credentials {
  firstName: string;
  lastName: string;
  id: string;
  credits: number;
  email: string;
  blogUrl: string;
  userBlogApiKey: string;
  accessToken: string;
}

function GoogleRedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  let user: any = params.get("user");

  if (user) {
    user = JSON.parse(user);
  }

  console.log(user);

  const getMe = async () => {
    if (user) {
      const credentials: Credentials = {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        id: user?.id ?? "",
        credits: user?.credits ?? 0,
        email: user?.email ?? "",
        blogUrl: user?.blogUrl ?? "",
        userBlogApiKey: user?.userBlogApiKey ?? "",
        accessToken: user?.accessToken ?? "",
      };

      //store user data in local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Store the user data in cookies (e.g., set for 7 days)
      Cookies.set("user", JSON.stringify(credentials), {
        expires: 7,
        secure: true,
      });

      // Dispatch user data to Redux store
      dispatch(logIn(credentials));

      // Redirect user to the target page
      router.push("/write");
    }
  };

  useEffect(() => {
    getMe();
  }, [router]);

  return (
    <>
      <Loading />
    </>
  );
}

function Page() {
  return (
    <Suspense>
      <GoogleRedirectPage />
    </Suspense>
  );
}

export default Page;
