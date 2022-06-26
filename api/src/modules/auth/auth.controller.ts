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
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserRole } from 'src/common/types/enums/user-role.enum';
import { UserPayload } from 'src/common/types/interfaces/user-payload';
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
  @Auth(UserRole.ADMIN)
  refreshTokens(@User() user: UserPayload) {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }
}
