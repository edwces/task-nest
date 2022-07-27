import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ValidateResetCodeDTO } from '../dto/validate-reset-code.dto';
import { CreateResetCodeDTO } from '../dto/create-reset-code.dto';
import { ResetService } from '../services/reset.service';
import { Throttle } from '@nestjs/throttler';
import { ResetPasswordDTO } from '../dto/reset-password.dto';

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
  validateResetCode(@Body() dto: ValidateResetCodeDTO) {
    return this.resetService.validateResetCodeByEmail(dto);
  }

  @Throttle(15, 60)
  @Post()
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDTO) {
    return this.resetService.resetPassword(dto);
  }
}
