import { useMutation } from "react-query";
import { http } from "../../../config/httpClient";
import { CreateResetCodeDTO } from "../dto/create-reset-code.dto";

function createResetCode(data: CreateResetCodeDTO) {
  return http.post<void>("/auth/reset/code", data);
}

export function useCreateResetCodeMutation() {
  return useMutation((data: CreateResetCodeDTO) => createResetCode(data));
}
