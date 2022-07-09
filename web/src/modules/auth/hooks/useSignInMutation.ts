import { useMutation } from "react-query";
import { useSession } from "../../../common/store/useSession";
import { SignInFieldsDTO } from "../dto/sign-in-fields.dto";
import { signIn } from "../services/auth.service";

export function useSignInMutation() {
  const setSignedIn = useSession((state) => state.setSignedIn);
  return useMutation((dto: SignInFieldsDTO) => signIn(dto), {
    onSuccess(data) {
      setSignedIn(data.user, data.token);
    },
  });
}
