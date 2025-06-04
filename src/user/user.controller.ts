import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put
} from '@nestjs/common'
import { UserRole } from '@prisma/__generated__'

import { Authorization } from '@/auth/decorators/auth.decorator'
import { Authorized } from '@/auth/decorators/authorizated.decorator'
import { UserDto } from '@/user/dto/user.dto'
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

  @Put('profile/:id')
  @HttpCode(HttpStatus.OK)
  @Authorization(UserRole.ADMIN)
  public async updateProfile(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async updateProfileUser(
    @Authorized('id') id: string,
    @Body() dto: UserDto
  ) {
    return this.userService.updateProfile(id, dto)
  }
}
