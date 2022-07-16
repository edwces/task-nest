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
import { JWT_REFRESH_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { ResetCodeFieldsDTO } from './dto/reset-code-fields.dto';
import { ResetPasswordFieldsDTO } from './dto/reset-password-fields.dto';
import { SignInFieldsDTO } from './dto/sign-in-fields.dto';
import { SignUpFieldsDTO } from './dto/sign-up-fields.dto';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { SessionUser } from './interfaces/session-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInFieldsDTO,
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

  @Post('signup')
  signUp(@Body() dto: SignUpFieldsDTO) {
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

  @Post('forgot/code')
  @HttpCode(HttpStatus.OK)
  createResetCode(@Body() dto: ResetCodeFieldsDTO) {
    this.authService.createResetCode(dto.email);
  }

  @Post('forgot/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordFieldsDTO) {
    return this.authService.resetPassword(dto);
  }
}
