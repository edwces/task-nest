import { useMutation } from "react-query";
import { http } from "../../../config/httpClient";
import { SignUpDTO } from "../dto/sign-up.dto";

function signUp(data: SignUpDTO) {
  return http.post<void>("/auth/signup", data);
}

export function useSignUpMutation() {
  return useMutation((dto: SignUpDTO) => signUp(dto));
}
