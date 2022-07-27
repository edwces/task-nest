import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CheckResetCodeDTO } from '../dto/check-reset-code.dto';
import { CreateResetCodeDTO } from '../dto/create-reset-code.dto';
import { ResetPasswordFieldsDTO } from '../dto/reset-password-fields.dto';
import { ResetService } from '../services/reset.service';
import { Throttle } from '@nestjs/throttler';

@Controller('auth/reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Throttle(15, 60)
  @Post('code')
  @HttpCode(HttpStatus.OK)
  createResetCode(@Body() dto: CreateResetCodeDTO) {
    return this.resetService.createResetCode(dto);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validateResetCode(@Body() dto: CheckResetCodeDTO) {
    return this.resetService.validateResetCodeByEmail(dto);
  }

  @Throttle(15, 60)
  @Post()
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordFieldsDTO) {
    return this.resetService.resetPassword(dto);
  }
}
