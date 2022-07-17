import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CheckResetCodeDTO } from '../dto/check-reset-code.dto';
import { CreateResetCodeDTO } from '../dto/create-reset-code.dto';
import { ResetPasswordFieldsDTO } from '../dto/reset-password-fields.dto';
import { ResetService } from '../services/reset.service';

@Controller('auth/reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('code')
  @HttpCode(HttpStatus.OK)
  createResetCode(@Body() dto: CreateResetCodeDTO) {
    return this.resetService.createResetCode(dto);
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  checkResetCode(@Body() dto: CheckResetCodeDTO) {
    return this.resetService.checkResetCode(dto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordFieldsDTO) {
    return this.resetService.resetPassword(dto);
  }
}
