import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { http } from "../../config/httpClient";
import { useSession } from "../store/useSession";

export function useHttpClientInterceptors() {
  const token = useSession((state) => state.token);

  useEffect(() => {
    const attachAuthHeader = (config: AxiosRequestConfig<any>) => {
      if (!token) return config;

      config.headers!.authorization = `Bearer ${token}`;
      return config;
    };

    const id = http.interceptors.request.use(attachAuthHeader);

    return () => http.interceptors.request.eject(id);
  }, [token]);
}
