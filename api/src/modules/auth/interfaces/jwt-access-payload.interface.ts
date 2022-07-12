export interface JWTAccessPayload {
  sub: number;
  email: string;
  name: string;
  exp: number;
}
