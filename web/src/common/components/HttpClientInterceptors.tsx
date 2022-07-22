import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { ReactNode, useCallback } from "react";
import { http } from "../../config/httpClient";
import { useLogoutMutation } from "../../modules/auth/hooks/useLogoutMutation";
import { refreshToken } from "../../modules/auth/services/auth.service";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { useSession } from "../store/useSession";

interface HttpClientInterceptorsProps {
  children: ReactNode;
}

export function HttpClientInterceptors({
  children,
}: HttpClientInterceptorsProps) {
  const { token, status, setSignedIn } = useSession();
  const logout = useLogoutMutation();
  const router = useRouter();

  const attachAuthHeaderIfExists = async (config: AxiosRequestConfig<any>) => {
    if (status === "signOut" || status === "idle") return config;
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  const handleResponseError = async (error: AxiosError) => {
    if (error.response) {
      const request = error.config;
      const statusCode = error.response?.status;
      const requestUrl = error.config.url;

      if (statusCode === 401 && !requestUrl!.includes("/auth")) {
        return refreshToken({})
          .then((data) => {
            setSignedIn(data.user, data.token);
            // new fetch does not trigger react query
            http(request);
            return Promise.resolve();
          })
          .catch((error) => {
            if (error.response)
              logout.mutate({}, { onSuccess: () => router.push("/") });
            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  };

  const handleRequest = useCallback(attachAuthHeaderIfExists, [token, status]);

  useIsomorphicLayoutEffect(() => {
    const id = http.interceptors.request.use(handleRequest);
    const id2 = http.interceptors.response.use(
      (response) => response,
      handleResponseError
    );

    return () => {
      http.interceptors.request.eject(id);
      http.interceptors.response.eject(id2);
    };
  }, [token]);

  return <>{children}</>;
}
