import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSession } from "../../../common/store/useSession";

interface AuthGateProps {
  children: ReactNode;
  redirectUrl: string;
}

export function AuthGate({ children, redirectUrl }: AuthGateProps) {
  const status = useSession((state) => state.status);
  const router = useRouter();

  useEffect(() => {
    console.log(status);

    if (status === "signOut") router.push(redirectUrl);
  }, [status, redirectUrl]);

  if (status === "signIn") return <>{children}</>;

  return <div>Loading</div>;
}
