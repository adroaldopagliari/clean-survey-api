import { EmailValidator } from '../presentation/protocols/email-validator';

// eslint-disable-next-line import/prefer-default-export
export class EmailValidatorAdapter implements EmailValidator {
  isValid(_email: string): boolean {
    return false;
  }
}
