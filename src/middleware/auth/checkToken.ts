import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError, HttpStatusCode } from '../error/ApiError';

interface JwtPayload {
  _id?: string;
  email?: string;
}

export const checkToken: RequestHandler = async (req, res, next) => {
  try {
    const tokenParts: Array<string> | undefined =
      req.headers.authorization?.split(' ');

    if (!tokenParts) {
      next(
        new ApiError(HttpStatusCode.INVALID_AUTHENTICATION, 'token not found'),
      );
      return;
    }

    const [, token] = tokenParts;

    const { _id, email } = jwt.verify(
      token,
      config.server.jwtSecretKey!,
    ) as JwtPayload;

    if (!_id) {
      next(
        new ApiError(
          HttpStatusCode.INVALID_AUTHENTICATION,
          'Unauthorized user',
        ),
      );
      return;
    }

    next();
  } catch (error) {
    next(new ApiError(HttpStatusCode.INVALID_AUTHENTICATION, 'Invalid token'));
  }
};
