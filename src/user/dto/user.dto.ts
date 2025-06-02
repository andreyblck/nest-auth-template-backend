import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  displayName: string

  @IsBoolean({ message: 'isTwoFactorEnabled must be a boolean' })
  isTwoFactorEnabled: boolean
}
