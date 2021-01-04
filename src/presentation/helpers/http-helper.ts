import { ServerError } from '../errors';
import { httpResponse } from '../protocols';

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): httpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
