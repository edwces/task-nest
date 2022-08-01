import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "../../../common/hooks/useIsomorphicLayoutEffect";
import { useSession } from "../../../common/store/useSession";
import { http } from "../../../config/httpClient";
import { useLogoutMutation } from "../api/useLogoutMutation";
import { refreshToken } from "../util/refresh-token.util";

export function useHttpInterceptors() {
  const { token, status, setSignedIn } = useSession();
  const logout = useLogoutMutation();
  const router = useRouter();

  const attachAuthHeaderIfExists = async (config: AxiosRequestConfig<any>) => {
    if (status === "signOut" || status === "idle") return config;
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  const logoutOrRefreshOnError = async (error: AxiosError) => {
    if (error.response) {
      const request = error.config;
      const statusCode = error.response?.status;
      const requestUrl = error.config.url;

      // Refresh token and refetch request or
      // on if Refresh Token is invalid
      // Logout and redirect to signIn screen
      if (statusCode === 401 && !requestUrl!.includes("/auth")) {
        return refreshToken({})
          .then(async (data) => {
            setSignedIn(data.user, data.token);
            const response = await http(request);
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            if (error.response)
              logout.mutate(undefined, { onSuccess: () => router.push("/") });
            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  };

  useIsomorphicLayoutEffect(() => {
    const requestId = http.interceptors.request.use(attachAuthHeaderIfExists);
    const responseId = http.interceptors.response.use(
      (response) => response,
      logoutOrRefreshOnError
    );

    return () => {
      http.interceptors.request.eject(requestId);
      http.interceptors.response.eject(responseId);
    };
  }, [token]);
}
