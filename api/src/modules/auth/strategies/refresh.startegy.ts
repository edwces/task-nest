import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/shared/types/interfaces/environment-variables.interface';
import { cookieExtractor } from '../helpers/cookie-extractor.helper';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: any) {
    const refreshToken = request.cookies['refresh_token'];

    return { payload, refreshToken };
  }
}
