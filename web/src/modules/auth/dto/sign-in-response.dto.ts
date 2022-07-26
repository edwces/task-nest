import { SessionUser } from "../../../common/interfaces/session-user.interface";

export interface SignInResponseDTO {
  token: string;
  user: SessionUser;
}
