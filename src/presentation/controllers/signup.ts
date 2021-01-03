import MissingParamError from '../errors/missing-param-error';
import badRequest from '../helpers/http-helper';
import { HttpRequest, httpResponse } from '../protocols/http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest(new MissingParamError(field));
    }

    return null;
  }
}
