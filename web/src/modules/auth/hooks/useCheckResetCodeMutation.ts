import { useMutation } from "react-query";
import { CheckCodeDTO } from "../dto/check-code.dto";
import { checkResetCode } from "../services/reset.service";

export function useCheckResetCodeMutation() {
  return useMutation((dto: CheckCodeDTO) => checkResetCode(dto));
}
