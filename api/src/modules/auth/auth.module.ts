import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.startegy';

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTAccessStrategy, JWTRefreshStrategy],
})
export class AuthModule {}
