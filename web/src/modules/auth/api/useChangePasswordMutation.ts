import { useMutation } from "react-query";
import { http } from "../../../config/httpClient";
import { ChangePasswordDTO } from "../dto/change-password.dto";

function changePassword(data: ChangePasswordDTO) {
  return http.post<void>("/auth/reset", data);
}

export function useChangePasswordMutation() {
  return useMutation((data: ChangePasswordDTO) => changePassword(data));
}
