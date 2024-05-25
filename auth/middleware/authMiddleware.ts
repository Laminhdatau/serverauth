import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { superEnv } from '../utils/variable';
import { AuthenticatedRequest, DecodedToken } from '../types/ApiResponse';


export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, superEnv.JWT_SECRET!) as DecodedToken;

      req.user = decoded.id;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
