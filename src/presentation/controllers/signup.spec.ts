// eslint-disable-next-line max-classes-per-file
import { InvalidParamError, MissingParamError, ServerError } from '../errors';
import { EmailValidator } from '../protocols/email-validator';
import SignUpController from './signup';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  it('Should return 400 if name was not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'example@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if e-mail was not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'example',
        password: '123456',
        passwordConfirmation: '123456',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('Should return 400 if password was not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'example',
        email: 'example@example.com',
        passwordConfirmation: '123456',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('Should return 400 if password confirmation was not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'example',
        email: 'example@example.com',
        password: '123456',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('Should return 400 if an invalid email was provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'example',
        email: 'example.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'example',
        email: 'example@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('example@example.com');
  });

  it('Should return 500 if email validator throws an error', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(_email: string): boolean {
        throw new Error('Error');
      }
    }

    const emailValidatorWithErrorStub = new EmailValidatorStub();
    const localSut = new SignUpController(emailValidatorWithErrorStub);

    const httpRequest = {
      body: {
        name: 'example',
        email: 'example.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    };
    const httpResponse = localSut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
