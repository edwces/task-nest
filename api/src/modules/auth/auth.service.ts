import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(dto: SignUpDTO) {
    this.userService.create(dto);
  }

  async signIn(dto: SignInDTO) {}

  async logout() {}

  async getTokens() {}
}
