import jwt from 'jsonwebtoken';
import { superEnv } from './variable';

export const generateToken = (id: number) => {
  return jwt.sign({ id }, superEnv.JWT_SECRET!, {
    expiresIn: '1h',
  });
};
