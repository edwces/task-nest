import { useMutation } from "react-query";
import { SignUpFieldsDTO } from "../dto/sign-up-fields.dto";
import { signUp } from "../services/auth.service";

export function useSignUpMutation() {
  return useMutation((dto: SignUpFieldsDTO) => signUp(dto));
}
