import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JWTAccessGuard } from './guards/jwt-access.guard';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.startegy';
import { ResetController } from './controllers/reset.controller';
import { ResetService } from './services/reset.service';

@Module({
  imports: [EmailModule, UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController, ResetController],
  providers: [
    AuthService,
    ResetService,
    JWTAccessStrategy,
    JWTRefreshStrategy,
    JWTAccessGuard,
    JWTRefreshGuard,
  ],
})
export class AuthModule {}
