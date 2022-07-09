import { AxiosRequestConfig } from "axios";
import { ReactNode } from "react";
import { http } from "../../config/httpClient";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { useSession } from "../store/useSession";

interface HttpClientInterceptorsProps {
  children: ReactNode;
}

export function HttpClientInterceptors({
  children,
}: HttpClientInterceptorsProps) {
  const token = useSession((state) => state.token);
  const attachAuthHeader = (config: AxiosRequestConfig<any>) => {
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  useIsomorphicLayoutEffect(() => {
    const id = http.interceptors.request.use(attachAuthHeader);

    return () => {
      http.interceptors.request.eject(id);
    };
  }, [token]);

  return <>{children}</>;
}
