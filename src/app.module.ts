import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module'
import { ProviderModule } from './auth/provider/provider.module'
import { HealthModule } from './health/health.module'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.utils'
import { MailModule } from './libs/mail/mail.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    HealthModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule
  ]
})
export class AppModule {}
