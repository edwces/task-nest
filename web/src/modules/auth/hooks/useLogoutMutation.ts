import { useMutation } from "react-query";
import { logout } from "../services/auth.service";

export function useLogoutMutation() {
  return useMutation(() => logout());
}
