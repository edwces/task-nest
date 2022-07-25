import { SignUpDTO } from "./sign-up.dto";

export type SignInDTO = Omit<SignUpDTO, "name">;
