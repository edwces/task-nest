import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/shared/types/interfaces/environment-variables.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async singUp(dto: SignUpDTO) {
    const doesExist = await this.userService.findOne({ email: dto.email });
    if (doesExist)
      throw new ConflictException('User with that email already exists');

    const user = await this.userService.create(dto);
  }

  async signIn({ email, password }: SignInDTO) {
    const user = await this._getUserByCredentials({ email, password });

    const { accessToken, refreshToken } = await this._createTokens({
      email,
      sub: user.id,
    });

    return { accessToken, user, refreshToken };
  }

  async logout() {
    return '';
  }

  async refreshTokens() {
    return '';
  }

  private async _getUserByCredentials({ email, password }: SignInDTO) {
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
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: 1000 * 60 * 60 * 60,
      }),
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: 1000 * 60 * 60,
      }),
    };
  }
}
