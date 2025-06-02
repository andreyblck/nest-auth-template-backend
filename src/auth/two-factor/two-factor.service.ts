import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { TokenType } from '@prisma/__generated__'

import { generateSixDigitNumberInRange } from '@/libs/common/utils/generate-random.util'
import { MailService } from '@/libs/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class TwoFactorService {
  constructor(
    private readonly userService: UserService,
    private readonly db: PrismaService,
    private readonly mailService: MailService
  ) {}

  public async sendTwoFactorToken(email: string) {
    // const user = await this.userService.findByEmail(email)
    //
    // if (!user) {
    //   throw new NotFoundException(
    //     "User doesn't exist. Try to use different email."
    //   )
    // }

    const token = generateSixDigitNumberInRange().toString()

    const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await this.db.token.findFirst({
      where: {
        email: email,
        type: TokenType.TWO_FACTOR
      }
    })

    if (existingToken) {
      await this.db.token.delete({
        where: { id: existingToken.id, type: TokenType.TWO_FACTOR }
      })
    }

    const twoFactorToken = await this.db.token.create({
      data: {
        email: email,
        type: TokenType.TWO_FACTOR,
        token,
        expiresIn
      }
    })

    this.mailService.sendTwoFactorTokenEmail(email, token)

    return twoFactorToken
  }

  public async verificationTwoFactorCode(email: string, token: string) {
    const existingToken = await this.db.token.findFirst({
      where: {
        token,
        type: TokenType.TWO_FACTOR
      }
    })

    if (!existingToken) {
      throw new NotFoundException('Token not found')
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Token has expired')
    }

    if (existingToken.email !== email) {
      throw new BadRequestException('Token is invalid')
    }

    await this.db.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR
      }
    })

    return true
  }
}
