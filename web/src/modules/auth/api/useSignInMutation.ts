import { useMutation } from "react-query";
import { useSession } from "../../../common/store/useSession";
import { http } from "../../../config/httpClient";
import { SignInResponseDTO } from "../dto/sign-in-response.dto";
import { SignInDTO } from "../dto/sign-in.dto";

function signIn(data: SignInDTO) {
  return http
    .post<SignInResponseDTO>("/auth/signin", data, { withCredentials: true })
    .then((response) => response.data);
}

export function useSignInMutation() {
  const setSignedIn = useSession((state) => state.setSignedIn);
  return useMutation((data: SignInDTO) => signIn(data), {
    onSuccess: ({ user, token }) => setSignedIn(user, token),
  });
}
