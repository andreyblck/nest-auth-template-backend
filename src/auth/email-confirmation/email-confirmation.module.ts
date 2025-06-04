import { forwardRef, Module } from '@nestjs/common'

import { AuthModule } from '@/auth/auth.module'
import { EmailConfirmationController } from '@/auth/email-confirmation/email-confirmation.controller'
import { EmailConfirmationService } from '@/auth/email-confirmation/email-confirmation.service'
import { MailModule } from '@/libs/mail/mail.module'
import { UserModule } from '@/user/user.module'

@Module({
  imports: [MailModule, forwardRef(() => AuthModule), UserModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
