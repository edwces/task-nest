import { AxiosRequestConfig } from "axios";
import { ReactNode, useEffect, useState } from "react";
import { http } from "../../config/httpClient";
import { useSession } from "../store/useSession";

interface HttpClientInterceptorsProps {
  children: ReactNode;
}

export function HttpClientInterceptors({
  children,
}: HttpClientInterceptorsProps) {
  const token = useSession((state) => state.token);
  const [isSet, set] = useState(false);
  const attachAuthHeader = (config: AxiosRequestConfig<any>) => {
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  useEffect(() => {
    const id = http.interceptors.request.use(attachAuthHeader);
    set(true);

    return () => {
      set(false);
      http.interceptors.request.eject(id);
    };
  }, [token]);

  return <>{isSet && children}</>;
}
