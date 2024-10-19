import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ render }: { render: JSX.Element }) {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  if (isLoggedIn) {
    return render;
  } else {
    router.push("/");
  }
}
