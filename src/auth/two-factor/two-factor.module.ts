import { Module } from '@nestjs/common'

import { MailModule } from '@/libs/mail/mail.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { UserModule } from '@/user/user.module'

import { TwoFactorService } from './two-factor.service'

@Module({
  imports: [MailModule, UserModule, PrismaModule],
  controllers: [],
  providers: [TwoFactorService],
  exports: [TwoFactorService]
})
export class TwoFactorModule {}
