import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { getMailConfig } from '@/config/mailer.config'

import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMailConfig,
      inject: [ConfigService]
    })
  ],
  exports: [MailService],
  providers: [MailService]
})
export class MailModule {}
