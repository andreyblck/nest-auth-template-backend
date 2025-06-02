import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { TokenType, User } from '@prisma/__generated__'
import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { AuthService } from '@/auth/auth.service'
import { MailService } from '@/libs/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

import { ConfirmationDto } from './dto/confirmation.dto'

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  private async generateVerificationToken(email: string) {
    const token = uuidv4()

    const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await this.prisma.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION
      }
    })

    if (existingToken) {
      await this.prisma.token.delete({
        where: { id: existingToken.id, type: TokenType.VERIFICATION }
      })
    }

    const verificationToken = await this.prisma.token.create({
      data: {
        email,
        type: TokenType.VERIFICATION,
        token,
        expiresIn
      }
    })

    return verificationToken
  }

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prisma.token.findUnique({
      where: {
        token: dto.token,
        type: TokenType.VERIFICATION
      }
    })

    if (!existingToken) {
      throw new NotFoundException('Token not found')
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Token has expired')
    }

    const existingUser = await this.userService.findByEmail(existingToken.email)

    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    await this.prisma.user.update({
      where: { id: existingUser.id },
      data: { isVerified: true }
    })

    await this.prisma.token.delete({
      where: { id: existingToken.id, type: TokenType.VERIFICATION }
    })

    return this.authService.saveSession(req, existingUser)
  }

  public async sendVerificationToken(user: User) {
    const verificationToken = await this.generateVerificationToken(user.email)

    await this.mailService.sendConfirmationEmail(
      user.email,
      verificationToken.token
    )

    return true
  }
}
