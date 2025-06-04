import { Module } from '@nestjs/common'

import { MailModule } from '@/libs/mail/mail.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { UserModule } from '@/user/user.module'

import { PasswordRecoveryController } from './password-recovery.controller'
import { PasswordRecoveryService } from './password-recovery.service'

@Module({
  imports: [MailModule, UserModule, PrismaModule],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}
