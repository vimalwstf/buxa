import { useAppDispatch } from "@/lib/hooks";
import { logOut } from "@/lib/user/userSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Cookies from "js-cookie";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Remove user data from cookies
    Cookies.remove("user");

    // Dispatch logOut action to update Redux state
    dispatch(logOut());

    // Redirect user to the home or login page
    router.replace("/");
  }, [dispatch, router]);

  return handleLogout;
}
