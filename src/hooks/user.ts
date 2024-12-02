import { setAccessToken } from "@/actions/accessToken";
import { snackBar } from "@/lib/utils";
import { logOut } from "@/lib/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export function useUnauthorisedUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return async () => {
    console.log("User not authenticated");
    snackBar("Session expired. Please login again.", "error");
    await setAccessToken("");
    localStorage.removeItem("user");
    dispatch(logOut());
    router.replace("/");
  };
}
