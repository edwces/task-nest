import { http } from "../../../config/httpClient";
import { CreateCodeFieldsDTO } from "../components/forgot/CreateCodeForm";
import { CheckCodeDTO } from "../dto/check-code.dto";
import { ResetPasswordDTO } from "../dto/reset-password.dto";

export function createResetCode(dto: CreateCodeFieldsDTO) {
  return http.post("/auth/reset/code", dto);
}

export function resetPassword(dto: ResetPasswordDTO) {
  return http.post("/auth/reset", dto);
}

export function checkResetCode(dto: CheckCodeDTO) {
  return http.post("/auth/reset/check", dto);
}
