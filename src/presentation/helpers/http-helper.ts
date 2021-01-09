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

export const ok = (data: unknown): httpResponse => ({
  statusCode: 200,
  body: data,
});
