import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidator', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => false);
    const isValid = sut.isValid('invalid_email@email.com');

    expect(isValid).toBe(false);
  });

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_email@email.com');

    expect(isValid).toBe(true);
  });

  it('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter();
    const spyIsEmail = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@email.com');

    expect(spyIsEmail).toBeCalledWith('any_email@email.com');
  });
});
