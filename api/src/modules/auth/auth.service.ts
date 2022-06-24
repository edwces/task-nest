import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(dto: SignUpDTO) {
    const doesExist = this.userService.findOne({ email: dto.email });
    if (doesExist)
      throw new ConflictException('User with that email already exists');

    const user = await this.userService.create(dto);
  }

  async signIn({ email, password }: SignInDTO) {
    const user = await this._validateCredentials({ email, password });

    const userPayload = {
      email,
      sub: user.id,
    };

    const { accessToken, refreshToken } = await this._createTokens(userPayload);

    return { accessToken, user: { id: user.id, email } };
  }

  async logout() {
    return '';
  }

  async refreshTokens() {
    return '';
  }

  private async _validateCredentials({ email, password }: SignInDTO) {
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnauthorizedException('User with that email does not exist');

    const isPasswordValid = await argon2.verify(user.hash, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');

    return user;
  }

  private async _createTokens(payload: any) {
    return {
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: 'secret_rt',
      }),
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'secret_at',
      }),
    };
  }
}
