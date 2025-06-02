import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator'
import { IsPasswordStrong } from '@/libs/common/decorators/is-password-strong.decorator'
import { IsPasswordsMatchingConstraint } from '@/libs/common/decorators/is-password-marching.decorator'

export class RecoveryPasswordDto {
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be less than 32 characters long' })
  @IsPasswordStrong()
  password: string

  @IsString({ message: 'Password repeat must be a string' })
  @IsNotEmpty({ message: 'Password repeat is required' })
  @MinLength(8, {
    message: 'Password repeat must be at least 8 characters long'
  })
  @MaxLength(32, {
    message: 'Password repeat must be less than 32 characters long'
  })
  @IsPasswordStrong()
  @Validate(IsPasswordsMatchingConstraint, {
    message: 'Passwords do not match'
  })
  passwordRepeat: string
}