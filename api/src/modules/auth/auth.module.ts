import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.startegy';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'secret_rt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
