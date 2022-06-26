import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/common/types/interfaces/authenticated-request.interface';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken, user } = await this.authService.signIn(
      dto,
    );
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    this.authService.singUp(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  refreshTokens(@Req() request: AuthenticatedRequest) {
    return this.authService.refreshTokens(request.user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }
}
