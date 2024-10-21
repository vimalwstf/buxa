import { useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ render }: { render: JSX.Element }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.accessToken;
  if (isLoggedIn) {
    return render;
  } else {
    router.push("/");
  }
}
