export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  INVALID_AUTHENTICATION = 401,
}

export class ApiError extends Error {
  public readonly message: string;
  public readonly httpCode: HttpStatusCode;

  constructor(httpCode: HttpStatusCode, message: string, description?: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;
    this.httpCode = httpCode;

    // Error.captureStackTrace(this);
  }
}
