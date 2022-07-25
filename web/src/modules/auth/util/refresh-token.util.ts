import { http } from "../../../config/httpClient";
import { SignInResponseDTO } from "../dto/sign-in-response.dto";

type RefreshTokenParams = { signal?: AbortSignal };
export function refreshToken({ signal }: RefreshTokenParams) {
  return http
    .post<SignInResponseDTO>(
      "/auth/token",
      {},
      { withCredentials: true, signal }
    )
    .then((response) => response.data);
}
