import { Injectable, NotFoundException } from '@nestjs/common'
import { AuthMethod } from '@prisma/__generated__'
import { hash } from 'argon2'

import { PrismaService } from '@/prisma/prisma.service'
import { UserDto } from '@/user/dto/user.dto'

@Injectable()
export class UserService {
  public constructor(private readonly db: PrismaService) {}

  public async findById(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id
      },
      include: {
        accounts: true
      }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  public async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email
      },
      include: {
        accounts: true
      }
    })

    return user
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean
  ) {
    const user = await this.db.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        picture,
        method,
        isVerified
      },
      include: {
        accounts: true
      }
    })

    return user
  }

  public async updateProfile(id: string, dto: UserDto) {
    const user = await this.findById(id)

    const updatedUser = await this.db.user.update({
      where: { id: user.id },
      data: {
        email: dto.email,
        displayName: dto.displayName,
        isTwoFactorEnabled: dto.isTwoFactorEnabled
      }
    })

    return updatedUser
  }
}
