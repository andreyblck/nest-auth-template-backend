import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { RegisterDto } from '@/auth/dto/register.dto'

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  public validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as RegisterDto
    return obj.password === passwordRepeat
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'Passwords do not match'
  }
}
