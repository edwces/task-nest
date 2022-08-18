import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from '../../../common/interfaces/environment-variables.interface';
import { JWTAccessPayload } from '../interfaces/jwt-access-payload.interface';
import { SessionUser } from '../interfaces/session-user.interface';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JWTAccessPayload): SessionUser {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
