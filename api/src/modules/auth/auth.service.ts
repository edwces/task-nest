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
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnauthorizedException('User with that email does not exist');

    const isPasswordValid = await argon2.verify(user.hash, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');

    const userPayload = {
      email,
      sub: user.id,
    };

    const refreshToken = await this.jwtService.signAsync(userPayload, {
      secret: 'secret_rt',
    });
    const accessToken = await this.jwtService.signAsync(userPayload, {
      secret: 'secret_at',
    });

    this.userService.assignToken(user.id, refreshToken);

    return { accessToken, user: { id: user.id, email } };
  }

  async logout() {}

  async refreshTokens() {}
}
