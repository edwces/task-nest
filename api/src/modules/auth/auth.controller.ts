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
import { RefreshClaims } from 'src/common/types/interfaces/refresh-claims.interface';
import { JWT_REFRESH_COOKIE_NAME } from './auth.consts';
import { AuthService } from './auth.service';
import { SignInFieldsDTO } from './dto/sign-in-fields.dto';
import { SignUpFieldsDTO } from './dto/sign-up-fields.dto';
import { RefreshGuard } from './guards/refresh.guard';

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
    response.cookie(JWT_REFRESH_COOKIE_NAME, refreshToken, { httpOnly: true });
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  @Post('signup')
  signUp(@Body() dto: SignUpFieldsDTO) {
    this.authService.singUp(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  refreshTokens(@User() user: RefreshClaims) {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }
}
