import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import { RecoveryTemplate } from '@/libs/mail/templates/recovery.template'

import { ConfirmationTemplate } from './templates/confirmation.template'
import { TwoFactorTemplate } from '@/libs/mail/templates/two-factor.template'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  public async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

    const html = await render(ConfirmationTemplate({ token, domain }))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.sendEmail(email, 'Confirm your email', html)
  }

  public async sendRecoveryEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

    const html = await render(RecoveryTemplate({ token, domain }))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.sendEmail(email, 'Reset your password', html)
  }

  private sendEmail(to: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to,
      subject,
      html
    })
  }

  public async sendTwoFactorTokenEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

    const html = await render(TwoFactorTemplate({ token, domain }))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.sendEmail(email, 'Reset your password', html)
  }
}
