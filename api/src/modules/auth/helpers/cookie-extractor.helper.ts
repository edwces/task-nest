import { Request } from 'express';

export function cookieExtractor(request: Request) {
  if (request.cookies && request.cookies['refresh_token'])
    return request.cookies['refresh_token'];
  return null;
}
