import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import { isDev } from '@/libs/common/utils/is-dev.utils'

export const getMailConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: !isDev(configService),
    auth: {
      user: configService.getOrThrow<string>('MAIL_LOGIN'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD')
    }
  },
  defaults: {
    from: `Nest Template <${configService.getOrThrow<string>('MAIL_LOGIN')}>`
  }
})
