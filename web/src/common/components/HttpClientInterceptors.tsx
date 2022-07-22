import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { http } from "../../config/httpClient";
import { useLogoutMutation } from "../../modules/auth/hooks/useLogoutMutation";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { useSession } from "../store/useSession";

interface HttpClientInterceptorsProps {
  children: ReactNode;
}

export function HttpClientInterceptors({
  children,
}: HttpClientInterceptorsProps) {
  const { token, status } = useSession();
  const logout = useLogoutMutation();
  const router = useRouter();

  const handleRequest = async (config: AxiosRequestConfig<any>) => {
    if (status === "signOut" || status === "idle") return config;
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  const handleResponseError = async (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response?.status;
      const requestUrl = error.config.url;

      if (statusCode === 401 && !requestUrl!.includes("/auth"))
        logout.mutate({}, { onSuccess: () => router.push("/") });
    }
    return Promise.reject(error);
  };

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
