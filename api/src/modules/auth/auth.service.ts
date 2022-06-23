import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signIn(dto: SignUpDTO) {}
}
