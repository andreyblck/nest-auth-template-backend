import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'
import { Request } from 'express'

import { isDev } from '@/libs/common/utils/is-dev.utils'

export const getRecaptchaConfig = (
  configService: ConfigService
): GoogleRecaptchaModuleOptions => ({
  secretKey: configService.get('GOOGLE_RECAPTCHA_SECRET_KEY'),
  response: (req: Request) => req.headers.recaptcha as string,
  skipIf: isDev(configService)
})
