import { useMutation } from "react-query";
import { http } from "../../../config/httpClient";
import { ValidateResetCodeDTO } from "../dto/validate-reset-code.dto";

function checkResetCode(data: ValidateResetCodeDTO) {
  return http.post<void>("/auth/reset/validate", data);
}

export function useValidateResetCodeMutation() {
  return useMutation((data: ValidateResetCodeDTO) => checkResetCode(data));
}
