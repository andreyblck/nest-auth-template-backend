import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthMethod, User } from '@prisma/__generated__'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { LoginDto } from '@/auth/dto/login.dto'
import { RegisterDto } from '@/auth/dto/register.dto'
import { ProviderService } from '@/auth/provider/provider.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly db: PrismaService
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

    await this.saveSession(req, newUser)

    return newUser
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

  private async saveSession(req: Request, user: User) {
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
