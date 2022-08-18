import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { RESET_CODE_EXPIRE_TIME } from '../auth.constants';
import * as crypto from 'node:crypto';
import * as argon2 from 'argon2';
import * as nodemailer from 'nodemailer';
import { CreateResetCodeDTO } from '../dto/create-reset-code.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { ValidateResetCodeDTO } from '../dto/validate-reset-code.dto';
import { EmailService } from '../../email/email.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class ResetService {
  private readonly logger = new Logger(ResetService.name);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  async createResetCode({ email }: CreateResetCodeDTO) {
    const user = await this.userService.findOneByEmail(email);

    const code = crypto.randomBytes(4).toString('hex');
    const codeHash = await argon2.hash(code);

    await this.redis.set(
      user.id.toString(),
      codeHash,
      'EX',
      RESET_CODE_EXPIRE_TIME,
    );
    const info = await this.emailService.sendResetCode(code, email);
    this.logger.log(`Mail Preview: ${nodemailer.getTestMessageUrl(info)}`);
  }

  async resetPassword({ email, password, code }: ResetPasswordDTO) {
    const user = await this.userService.findOneByEmail(email);

    await this.validateCode(code, user.id);
    this.redis.del(user.id.toString());

    await this.userService.updatePasswordById(user.id, password);
  }

  async validateResetCodeByEmail({ email, code }: ValidateResetCodeDTO) {
    const user = await this.userService.findOneByEmail(email);

    await this.validateCode(code, user.id);
  }

  private async validateCode(code: string, id: number) {
    const redisCode = await this.redis.get(id.toString());
    if (!redisCode) throw new BadRequestException('Code must have expired');

    const isCodeValid = await argon2.verify(redisCode, code);
    if (!isCodeValid) throw new UnauthorizedException('Code is not valid');
  }
}
