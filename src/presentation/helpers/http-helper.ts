import { httpResponse } from '../protocols/http';

const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

export default badRequest;
