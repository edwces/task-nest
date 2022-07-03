import { http } from "../../../config/httpClient";
import { SignInFieldsDTO } from "../dto/sign-in-fields.dto";
import { SignInDTO } from "../dto/sign-in.dto";
import { SignUpFieldsDTO } from "../dto/sign-up-fields.dto";

export function signUp(data: SignUpFieldsDTO): Promise<void> {
  return http.post("/auth/signup", data);
}

export function signIn(data: SignInFieldsDTO): Promise<SignInDTO> {
  return http.post("/auth/signin", data).then((response) => response.data);
}

export function refreshToken(): Promise<SignInDTO> {
  return http
    .post("/auth/token", {}, { withCredentials: true })
    .then((response) => response.data);
}

export function logout(): Promise<void> {
  return http.post("/auth/logout", {}, { withCredentials: true });
}
