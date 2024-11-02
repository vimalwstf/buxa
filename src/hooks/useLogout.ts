import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { logOut } from "@/lib/user/userSlice";
import { useCallback } from "react";
export default function useLogout() {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/" });
    dispatch(logOut());
    
  },[dispatch]);
  return handleLogout;
};