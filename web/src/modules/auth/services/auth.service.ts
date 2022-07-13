import { http } from "../../../config/httpClient";
import { SignInFieldsDTO } from "../components/SignInForm";
import { SignUpFieldsDTO } from "../components/SignUpForm";
import { SignInDTO } from "../dto/sign-in.dto";

export function signUp(data: SignUpFieldsDTO): Promise<void> {
  return http.post("/auth/signup", data);
}

export function signIn(data: SignInFieldsDTO): Promise<SignInDTO> {
  return http
    .post("/auth/signin", data, { withCredentials: true })
    .then((response) => response.data);
}

export function refreshToken({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<SignInDTO> {
  return http
    .post("/auth/token", {}, { withCredentials: true, signal })
    .then((response) => response.data);
}

export function logout(): Promise<void> {
  return http.post("/auth/logout", {}, { withCredentials: true });
}
