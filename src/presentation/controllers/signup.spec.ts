import MissingParamError from '../errors/missing-param-error';
import SignUpController from './signup';

describe('SignUp Controller', () => {
  it('Should return 400 if name was not provided', () => {
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
});
