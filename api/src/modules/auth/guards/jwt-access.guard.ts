import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAccessGuard extends AuthGuard('jwt') {}
