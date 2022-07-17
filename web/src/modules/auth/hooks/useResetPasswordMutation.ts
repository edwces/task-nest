import { useMutation } from "react-query";
import { ResetPasswordDTO } from "../dto/reset-password.dto";
import { resetPassword } from "../services/reset.service";

export function useResetPasswordMutation() {
  return useMutation((dto: ResetPasswordDTO) => resetPassword(dto));
}
