import MissingParamError from '../errors/missing-param-error';
import badRequest from '../helpers/http-helper';
import { HttpRequest, httpResponse } from '../protocols/http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }

    return null;
  }
}
