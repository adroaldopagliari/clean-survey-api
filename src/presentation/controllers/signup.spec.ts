import SignUpController from './signup';

describe('SignUp Controller', () => {
  it('Should return 400 if name was not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      name: 'example',
      email: 'example@example.com',
      passwordConfirmation: '123456',
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
