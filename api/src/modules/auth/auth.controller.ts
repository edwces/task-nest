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
import { JWTRefreshPayload } from 'src/modules/auth/interfaces/jwt-refresh-payload.interface';
import { JWT_REFRESH_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { SignInFieldsDTO } from './dto/sign-in-fields.dto';
import { SignUpFieldsDTO } from './dto/sign-up-fields.dto';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';

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
  refreshTokens(@User() user: JWTRefreshPayload) {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTRefreshGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
