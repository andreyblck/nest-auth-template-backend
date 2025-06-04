import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { forwardRef, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthMethod, User } from '@prisma/__generated__'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { LoginDto } from '@/auth/dto/login.dto'
import { RegisterDto } from '@/auth/dto/register.dto'
import { EmailConfirmationService } from '@/auth/email-confirmation/email-confirmation.service'
import { ProviderService } from '@/auth/provider/provider.service'
import { MailService } from '@/libs/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

import { TwoFactorService } from './two-factor/two-factor.service'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly db: PrismaService,
    @Inject(forwardRef(() => EmailConfirmationService))
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorService: TwoFactorService
  ) {}

  public async register(req: Request, dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email)

    if (isExists) {
      throw new ConflictException(
        'User already exists. Use another email or login.'
      )
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      null,
      AuthMethod.CREDENTIALS,
      false
    )

    await this.emailConfirmationService.sendVerificationToken(newUser)

    return {
      message:
        'User created successfully. Please confirm your email. Message was sent to your email'
    }
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email)

    if (!user || !user.password) {
      throw new NotFoundException('User not found or password is not set')
    }

    const isPasswordValid = await verify(user.password, dto.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Email is not verified. Please confirm your email.'
      )
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.token) {
        await this.twoFactorService.sendTwoFactorToken(user.email)

        return {
          message: 'Two-factor authentication required. Token sent to email.'
        }
      }

      await this.twoFactorService.verificationTwoFactorCode(
        user.email,
        dto.token
      )
    }

    await this.saveSession(req, user)

    return user
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string
  ) {
    const providerInstance = this.providerService.findByService(provider)

    const profile = await providerInstance.findUserByCode(code)

    const account = await this.db.account.findFirst({
      where: {
        id: profile.id,
        provider: profile.provider
      }
    })

    let user = account?.userId
      ? await this.userService.findById(account.userId)
      : null

    if (user) {
      return this.saveSession(req, user)
    }

    user = await this.userService.create(
      profile.email,
      null,
      profile.name,
      profile.picture,
      AuthMethod[profile.provider.toUpperCase()] as AuthMethod,
      true
    )

    if (!account) {
      await this.db.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at
        }
      })
    }

    return this.saveSession(req, user)
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          return reject(
            new InternalServerErrorException('Failed to destroy session')
          )
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))

        resolve()
      })
    })
  }

  public async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save(err => {
        if (err) {
          return reject(
            new InternalServerErrorException('Failed to save session')
          )
        }

        resolve({ user })
      })
    })
  }
}
