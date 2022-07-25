import { SessionUser } from "../../../common/types/session-user.type";

export interface SignInResponseDTO {
  token: string;
  user: SessionUser;
}
