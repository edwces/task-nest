import { useMutation } from "react-query";
import { SignInFieldsDTO } from "../dto/sign-in-fields.dto";
import { signIn } from "../services/auth.service";

export function useSignInMutation() {
  return useMutation((dto: SignInFieldsDTO) => signIn(dto));
}
