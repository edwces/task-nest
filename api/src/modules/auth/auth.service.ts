import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInFieldsDTO } from './dto/sign-in-fields.dto';
import { SignUpFieldsDTO } from './dto/sign-up-fields.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/types/interfaces/environment-variables.interface';
import { Response } from 'express';
import {
  JWT_ACCESS_EXPIRE_TIME,
  JWT_REFRESH_COOKIE_NAME,
  JWT_REFRESH_EXPIRE_TIME,
} from './auth.consts';
import { RefreshClaims } from 'src/common/types/interfaces/refresh-claims.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async singUp(dto: SignUpFieldsDTO) {
    const doesExist = await this.userService.findOne({ email: dto.email });
    if (doesExist)
      throw new ConflictException('User with that email already exists');

    const user = await this.userService.create(dto);
  }

  async signIn({ email, password }: SignInFieldsDTO) {
    const user = await this._getUserByCredentials({ email, password });

    const payload = {
      email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = await this._createAccessToken(payload);
    const refreshToken = await this._createRefreshToken(payload);

    return { accessToken, user, refreshToken };
  }

  async logout(response: Response) {
    response.clearCookie(JWT_REFRESH_COOKIE_NAME);
  }

  async refreshTokens(payload: RefreshClaims) {
    return await this._createAccessToken(payload);
  }

  private async _getUserByCredentials({ email, password }: SignInFieldsDTO) {
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnauthorizedException('User with that email does not exist');

    const isPasswordValid = await argon2.verify(user.hash, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');

    return user;
  }

  private async _createAccessToken(payload: any) {
    return await this.jwtService.signAsync(
      { email: payload.email, sub: payload.sub, role: payload.role },
      {
        expiresIn: JWT_ACCESS_EXPIRE_TIME,
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      },
    );
  }

  private async _createRefreshToken(payload: any) {
    return await this.jwtService.signAsync(
      { email: payload.email, sub: payload.sub, role: payload.role },
      {
        expiresIn: JWT_REFRESH_EXPIRE_TIME,
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );
  }
}
