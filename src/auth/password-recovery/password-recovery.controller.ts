import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req
} from '@nestjs/common'
import { Request } from 'express'

import { RecoveryPasswordDto } from '@/auth/password-recovery/dto/recovery-password.dto'
import { RecoveryDto } from '@/auth/password-recovery/dto/recovery.dto'

import { PasswordRecoveryService } from './password-recovery.service'

@Controller('auth/recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async sendRecovery(@Body() dto: RecoveryDto) {
    return this.passwordRecoveryService.sendRecovery(dto)
  }

  @Post('confirm/:token')
  @HttpCode(HttpStatus.OK)
  public async confirmRecovery(@Param('token') token: string) {
    return this.passwordRecoveryService.confirmRecovery(token)
  }

  @Post('password/:token')
  @HttpCode(HttpStatus.CREATED)
  public async passwordRecovery(
    @Param('token') token: string,
    @Body() dto: RecoveryPasswordDto
  ) {
    return this.passwordRecoveryService.passwordRecovery(token, dto)
  }
}
