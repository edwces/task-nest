import { useMutation } from "react-query";
import { SignUpFieldsDTO } from "../components/SignUpForm";
import { signUp } from "../services/auth.service";

export function useSignUpMutation() {
  return useMutation((dto: SignUpFieldsDTO) => signUp(dto));
}
