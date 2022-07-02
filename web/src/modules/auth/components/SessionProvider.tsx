import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSession } from "../../../common/store/useSession";
import { refreshToken } from "../services/auth.service";

interface SessionProviderProps {
  children: ReactNode;
  redirectUrl: string;
}

export function SessionProvider({
  children,
  redirectUrl,
}: SessionProviderProps) {
  const { setSignedIn, setSignedOut, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    refreshToken()
      .then((data) => {
        setSignedIn(data.user, data.token);
      })
      .catch(() => {
        setSignedOut();
        router.push(redirectUrl);
      });
  }, []);

  if (status === "idle") return <div>Loading</div>;

  return <>{children}</>;
}
