import { http } from "../../../config/httpClient";
import { SignInDTO } from "../dto/sign-in.dto";
import { SignUpDTO } from "../dto/sign-up.dto";

export function signUp(data: SignUpDTO): Promise<void> {
  return http.post("/auth/signup", data);
}

export function signIn(data: SignInDTO) {
  return http.post("/auth/signin", data).then((response) => response.data);
}

export function refreshToken() {
  return http
    .post("/auth/token", {}, { withCredentials: true })
    .then((response) => response.data);
}

export function logout(): Promise<void> {
  return http.post("/auth/logout", {}, { withCredentials: true });
}
