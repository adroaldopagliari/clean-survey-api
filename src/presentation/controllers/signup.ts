import InvalidParamError from '../errors/invalid-param-error';
import MissingParamError from '../errors/missing-param-error';
import ServerError from '../errors/server-error';
import badRequest from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { HttpRequest, httpResponse } from '../protocols/http';

export default class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): httpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
      return null;
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
