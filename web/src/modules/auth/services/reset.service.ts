import { http } from "../../../config/httpClient";
import { CreateCodeFieldsDTO } from "../components/forgot/CreateCodeForm";
import { ValidateCodeDTO } from "../dto/validate-code.dto";
import { ResetPasswordDTO } from "../dto/reset-password.dto";

export function createResetCode(dto: CreateCodeFieldsDTO) {
  return http.post("/auth/reset/code", dto);
}

export function resetPassword(dto: ResetPasswordDTO) {
  return http.post("/auth/reset", dto);
}

export function checkResetCode(dto: ValidateCodeDTO) {
  return http.post("/auth/reset/validate", dto);
}
