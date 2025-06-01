import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { getProvidersConfig } from '@/config/providers.config'
import { getRecaptchaConfig } from '@/config/recaptcha.config'
import { MailService } from '@/libs/mail/mail.service'
import { UserService } from '@/user/user.service'

import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module'
import { ProviderModule } from './provider/provider.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService],
  imports: [
    forwardRef(() => EmailConfirmationModule),
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getProvidersConfig(configService),
      inject: [ConfigService]
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getRecaptchaConfig(configService),
      inject: [ConfigService]
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
