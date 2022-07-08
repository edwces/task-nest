import { ReactNode, useEffect } from "react";
import { HttpClientInterceptors } from "../../../common/components/HttpClientInterceptors";
import { useSession } from "../../../common/store/useSession";
import { refreshToken } from "../services/auth.service";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
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
  }, []);

  return <HttpClientInterceptors>{children}</HttpClientInterceptors>;
}
