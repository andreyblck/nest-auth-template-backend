import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { UserRole } from '@prisma/__generated__'

import { Authorization } from '@/auth/decorators/auth.decorator'
import { Authorized } from '@/auth/decorators/authorizated.decorator'
import { UserService } from '@/user/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async findProfile(@Authorized('id') userId: string) {
    return this.userService.findById(userId)
  }

  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  @Authorization(UserRole.ADMIN)
  public async findProfileById(@Param('id') id: string) {
    return this.userService.findById(id)
  }
}
