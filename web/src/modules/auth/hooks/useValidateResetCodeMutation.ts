import { useMutation } from "react-query";
import { ValidateCodeDTO } from "../dto/validate-code.dto";
import { checkResetCode } from "../services/reset.service";

export function useValidateResetCodeMutation() {
  return useMutation((dto: ValidateCodeDTO) => checkResetCode(dto));
}
