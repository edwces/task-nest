import { Request } from 'express';
import { JWT_REFRESH_COOKIE_NAME } from '../auth.constants';

export function jwtCookieExtractor(request: Request) {
  if (request.cookies && request.cookies[JWT_REFRESH_COOKIE_NAME])
    return request.cookies[JWT_REFRESH_COOKIE_NAME];
  return null;
}
