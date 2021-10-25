import { Request, Response, NextFunction } from 'express';
import { UnAuthoriseError, BadRequestError } from '../utils/ErrorHandler';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config/constants';

class User {
  public static async getUser(req: any, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      next(new UnAuthoriseError('Session Token must be present.'));
    }
    const token = accessToken.split(' ')[1] || accessToken;

    try {
      const decoded = await jwt.verify(token, jwtSecretKey as any);
      req.user = decoded;
      return next();
    } catch (err) {
      next(new UnAuthoriseError('Session Token must be present.'));
    }
  }
}

export default User;
