import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RecoveryDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string
}