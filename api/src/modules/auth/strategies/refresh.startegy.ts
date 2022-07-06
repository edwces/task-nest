import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/common/types/interfaces/environment-variables.interface';
import { cookieExtractor } from '../helpers/cookie-extractor.helper';
import { RefreshClaims } from '../interfaces/refresh-claims.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: RefreshClaims) {
    return payload;
  }
}
