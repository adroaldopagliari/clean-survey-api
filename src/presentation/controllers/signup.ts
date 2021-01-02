export default class SignUpController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        request: httpRequest,
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        request: httpRequest,
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return null;
  }
}
