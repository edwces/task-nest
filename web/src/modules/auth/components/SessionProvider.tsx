import { ReactNode, useEffect } from "react";
import { useSession } from "../../../common/store/useSession";
import { refreshToken } from "../services/auth.service";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { setSignedIn, setSignedOut, status } = useSession();

  useEffect(() => {
    refreshToken()
      .then((data) => {
        setSignedIn(data.user, data.token);
      })
      .catch(() => {
        setSignedOut();
      });
  }, [status]);

  return <>{children}</>;
}
