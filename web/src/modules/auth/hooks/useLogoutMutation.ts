import { useMutation } from "react-query";
import { useSession } from "../../../common/store/useSession";
import { logout } from "../services/auth.service";

export function useLogoutMutation() {
  const setSignedOut = useSession((state) => state.setSignedOut);
  return useMutation(() => logout(), {
    onSuccess(data) {
      setSignedOut();
    },
  });
}
