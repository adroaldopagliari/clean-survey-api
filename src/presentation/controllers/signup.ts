export default class SignUpController {
  handle(httpRequest: unknown): any {
    return {
      request: httpRequest,
      statusCode: 400,
    };
  }
}
