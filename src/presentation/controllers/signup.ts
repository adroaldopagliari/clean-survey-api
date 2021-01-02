export default class SignUpController {
  handle(httpRequest: unknown): any {
    return {
      request: httpRequest,
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
