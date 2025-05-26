import { registerDecorator, ValidationOptions } from 'class-validator'

// Minimum 8 characters
// Minimum 1 uppercase letter
// Minimum 1 lowercase letter
// Minimum 1 number
// Minimum 1 special character (@$!%?&)

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPasswordStrong',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/
          return regex.test(value)
        },
        defaultMessage() {
          return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }
      }
    })
  }
}
