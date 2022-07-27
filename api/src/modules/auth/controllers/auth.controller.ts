import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { JWT_REFRESH_COOKIE_NAME } from '../auth.constants';
import { AuthService } from '../services/auth.service';
import { JWTRefreshGuard } from '../guards/jwt-refresh.guard';
import { SessionUser } from '../interfaces/session-user.interface';
import { Throttle } from '@nestjs/throttler';
import { SignInDTO } from '../dto/sign-in.dto';
import { SignUpDTO } from '../dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle(15, 60)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken, user } = await this.authService.signIn(
      dto,
    );
    response.cookie(JWT_REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
    });
    return {
      token: accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
  @Throttle(15, 60)
  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    return this.authService.singUp(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTRefreshGuard)
  refreshToken(@User() user: SessionUser) {
    return this.authService.refreshToken(user.id);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTRefreshGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(JWT_REFRESH_COOKIE_NAME);
  }
}
