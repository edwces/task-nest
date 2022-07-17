import { useMutation } from "react-query";
import { CreateCodeFieldsDTO } from "../components/forgot/CreateCodeForm";
import { createResetCode } from "../services/reset.service";

export function useCreateResetCodeMutation() {
  return useMutation((dto: CreateCodeFieldsDTO) => createResetCode(dto));
}
