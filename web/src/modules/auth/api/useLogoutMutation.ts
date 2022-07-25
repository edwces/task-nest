import { useMutation } from "react-query";
import { useSession } from "../../../common/store/useSession";
import { http } from "../../../config/httpClient";

function logout() {
  return http.post<void>("/auth/logout", {}, { withCredentials: true });
}

export function useLogoutMutation() {
  const setSignedOut = useSession((state) => state.setSignedOut);
  return useMutation(() => logout(), {
    onSuccess: () => setSignedOut(),
  });
}
