import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useSession } from "../../../common/store/useSession";

interface AuthGateProps {
  children: ReactNode;
  redirectUrl: string;
}

export function AuthGate({ children, redirectUrl }: AuthGateProps) {
  const status = useSession((state) => state.status);
  const router = useRouter();

  if (status === "idle") return <div>Loading</div>;

  if (status === "signOut") {
    router.push(redirectUrl);
    return <div>Loading</div>;
  }
  return <>{children}</>;
}
