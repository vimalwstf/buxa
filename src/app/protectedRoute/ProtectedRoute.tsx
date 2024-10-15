import { useAppSelector } from "@/lib/hooks";

export default function ProtectedRoute({ render }: { render: JSX.Element }) {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? render : null;
}
