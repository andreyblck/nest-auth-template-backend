import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import { ConfirmationTemplate } from './templates/confirmation.template'

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

  private sendEmail(to: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to,
      subject,
      html
    })
  }
}
