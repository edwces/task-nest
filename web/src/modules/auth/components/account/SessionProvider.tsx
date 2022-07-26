import { ReactNode, useEffect } from "react";
import { useSession } from "../../../../common/store/useSession";
import { useHttpInterceptors } from "../../hooks/useHttpInterceptors";
import { refreshToken } from "../../util/refresh-token.util";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  useHttpInterceptors();
  const { setSignedIn, setSignedOut } = useSession();

  useEffect(() => {
    const controller = new AbortController();

    refreshToken({ signal: controller.signal })
      .then((data) => {
        setSignedIn(data.user, data.token);
      })
      .catch((error) => {
        if (error.response) {
          setSignedOut();
        }
      });

    return () => controller.abort();
  }, [setSignedIn, setSignedOut]);

  return <>{children}</>;
}
