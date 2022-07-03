import { SessionUser } from "../../../common/types/session-user.type";

export interface SignInDTO {
  token: string;
  user: SessionUser;
}
