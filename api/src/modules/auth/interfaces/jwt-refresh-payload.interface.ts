export interface JWTRefreshPayload {
  sub: number;
  email: string;
  name: string;
  exp: number;
}
