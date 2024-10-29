import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { logOut } from "@/lib/user/userSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
export default function useLogout() {
    const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    dispatch(logOut());
    router.replace("/");
  },[dispatch, router]);
  return handleLogout;
};