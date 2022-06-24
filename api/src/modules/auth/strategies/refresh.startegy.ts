import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dffd',
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: any) {
    const refreshToken = request.headers.authorization.split(' ')[1].trim();
    return { payload, refreshToken };
  }
}
