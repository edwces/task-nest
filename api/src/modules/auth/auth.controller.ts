import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  @Post('signin')
  signIn(@Body() dto: SignInDTO) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDTO) {}

  @Post('token')
  getToken() {}

  @Post('logout')
  logout() {}
}
