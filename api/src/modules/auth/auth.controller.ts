import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() dto: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken, user } = await this.authService.signIn(
      dto,
    );
    response.cookie('refresh_token', refreshToken);
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: SignUpDTO) {
    this.authService.singUp(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  refreshTokens() {
    this.authService.refreshTokens();
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    this.authService.logout();
  }
}
