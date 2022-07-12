import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/common/interfaces/environment-variables.interface';
import { jwtCookieExtractor } from '../helpers/jwt-cookie-extractor.helper';
import { JWTRefreshPayload } from '../interfaces/jwt-refresh-payload.interface';
import { SessionUser } from '../interfaces/session-user.interface';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: jwtCookieExtractor,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: JWTRefreshPayload): SessionUser {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
