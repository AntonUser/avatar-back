import {
  isEmail,
  isMobilePhone,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsEmailOrPhone implements ValidatorConstraintInterface {
  validate(emailOrPhone: string): Promise<boolean> | boolean {
    return isEmail(emailOrPhone) || isMobilePhone(emailOrPhone);
  }
}
export function EmailOrPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailOrPhone,
    });
  };
}
