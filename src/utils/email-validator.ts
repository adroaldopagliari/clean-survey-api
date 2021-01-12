import validator from 'validator';
import { EmailValidator } from '../presentation/protocols/email-validator';

// eslint-disable-next-line import/prefer-default-export
export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
