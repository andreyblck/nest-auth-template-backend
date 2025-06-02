import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { AuthMethod, TokenType } from '@prisma/__generated__'
import { hash } from 'argon2'
import { Request } from 'express'

import { AuthService } from '@/auth/auth.service'
import { RecoveryPasswordDto } from '@/auth/password-recovery/dto/recovery-password.dto'
import { RecoveryDto } from '@/auth/password-recovery/dto/recovery.dto'
import { generateSixDigitNumberInRange } from '@/libs/common/utils/generate-random.util'
import { MailService } from '@/libs/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly userService: UserService,
    private readonly db: PrismaService,
    private readonly mailService: MailService
  ) {}

  public async sendRecovery(dto: RecoveryDto) {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new NotFoundException(
        "User doesn't exist. Try to use different email."
      )
    }

    const token = generateSixDigitNumberInRange().toString()

    const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await this.db.token.findFirst({
      where: {
        email: user.email,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (existingToken) {
      await this.db.token.delete({
        where: { id: existingToken.id, type: TokenType.PASSWORD_RESET }
      })
    }

    const verificationToken = await this.db.token.create({
      data: {
        email: user.email,
        type: TokenType.PASSWORD_RESET,
        token,
        expiresIn
      }
    })

    this.mailService.sendRecoveryEmail(user.email, token)

    return true
  }

  public async confirmRecovery(token: string) {
    const existingToken = await this.db.token.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (!existingToken) {
      throw new NotFoundException('Token not found')
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Token has expired')
    }

    return true
  }

  public async passwordRecovery(token: string, dto: RecoveryPasswordDto) {
    const existingToken = await this.db.token.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (!existingToken) {
      throw new NotFoundException('Token not found')
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Token has expired')
    }

    const user = await this.userService.findByEmail(existingToken.email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.method === AuthMethod.GOOGLE) {
      throw new BadRequestException("User with current method doesn't exist.")
    }

    const password = await hash(dto.password)
    await this.db.user.update({
      where: { id: user.id },
      data: { password }
    })

    await this.db.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.PASSWORD_RESET
      }
    })

    return true
  }
}
