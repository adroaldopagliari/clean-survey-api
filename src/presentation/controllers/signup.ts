import { HttpRequest, httpResponse } from '../protocols/http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return null;
  }
}
