import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import {
  JWT_ACCESS_EXPIRE_TIME,
  JWT_REFRESH_EXPIRE_TIME,
} from '../auth.constants';
import { User } from '../../user/user.entity';
import { JWTAccessPayload } from '../interfaces/jwt-access-payload.interface';
import { JWTRefreshPayload } from '../interfaces/jwt-refresh-payload.interface';
import { SignUpDTO } from '../dto/sign-up.dto';
import { SignInDTO } from '../dto/sign-in.dto';
import { EnvironmentVariables } from '../../../common/interfaces/environment-variables.interface';

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

    await this.userService.create(dto);
  }

  async signIn({ email, password }: SignInDTO) {
    const user = await this.findUserByCredentials({ email, password });

    const payload = this.toJWTPayload(user);

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);

    return { accessToken, user, refreshToken };
  }

  async refreshToken(id: number) {
    const user = await this.userService.findOneById(id);
    const payload = this.toJWTPayload(user);

    const token = await this.createAccessToken(payload);

    return {
      token,
      user: { id: payload.sub, email: payload.email, name: payload.name },
    };
  }

  private async findUserByCredentials({ email, password }: SignInDTO) {
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnauthorizedException('User with that email does not exist');

    const isPasswordValid = await argon2.verify(user.hash, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');

    return user;
  }

  async createAccessToken(payload: Omit<JWTAccessPayload, 'exp'>) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: JWT_ACCESS_EXPIRE_TIME,
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async createRefreshToken(payload: Omit<JWTRefreshPayload, 'exp'>) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: JWT_REFRESH_EXPIRE_TIME,
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }

  private toJWTPayload(user: User) {
    return {
      email: user.email,
      name: user.name,
      sub: user.id,
    };
  }
}
