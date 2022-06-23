import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: SignInDTO) {
    this.authService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {
    this.authService.singUp(dto);
  }

  @Post('token')
  getToken() {
    this.authService.getTokens();
  }

  @Post('logout')
  logout() {
    this.authService.logout();
  }
}
