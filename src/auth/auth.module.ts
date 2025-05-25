import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { getRecaptchaConfig } from '@/config/recaptcha.config'
import { UserService } from '@/user/user.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService],
	imports: [
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) =>
				getRecaptchaConfig(configService),
			inject: [ConfigService]
		})
	]
})
export class AuthModule {}
