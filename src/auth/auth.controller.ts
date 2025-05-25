import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

import { AuthService } from '@/auth/auth.service'
import { LoginDto } from '@/auth/dto/login.dto'
import { RegisterDto } from '@/auth/dto/register.dto'

import { AuthProviderGuard } from './guards/provider.guard'
import { ProviderService } from './provider/provider.service'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authService: AuthService,
		private readonly providerService: ProviderService,
		private readonly configService: ConfigService
	) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	public async register(@Req() req: Request, @Body() dto: RegisterDto) {
		return this.authService.register(req, dto)
	}

	@Get('/oauth/callback/:provider')
	@UseGuards(AuthProviderGuard)
	public async oauthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@Param('provider') provider: string,
		@Query('code') code: string
	) {
		if (!code) {
			throw new BadRequestException(
				'Code is required. Please check the correctness of the entered data.'
			)
		}

		await this.authService.extractProfileFromCode(req, provider, code)

		return res.redirect(
			`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/`
		)
	}

	@Get('/oauth/connect/:provider')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthProviderGuard)
	public oauth(@Param('provider') provider: string) {
		const providerInstance = this.providerService.findByService(provider)

		return {
			url: providerInstance.getAuthUrl()
		}
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(@Req() req: Request, @Body() dto: LoginDto) {
		return this.authService.login(req, dto)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.logout(req, res)
	}
}
