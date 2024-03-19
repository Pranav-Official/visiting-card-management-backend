import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserTable from '../models/userTable';
import 'dotenv/config';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization ?? (req.headers.Authorization as string);
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized no token provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || '',
    (err: any, decoded: any) => {
      if (err) return res.status(403).json({ err });
      const user_id: string = decoded.user_id;

      const user = UserTable.findOne({
        where: { user_id: user_id },
        raw: true,
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Unauthorized, invalid token, user doesnt exist' });
      }
      if (req.method === 'GET') {
        req.query.user_id = user_id;
      } else {
        req.body.user_id = user_id;
      }
      next();
      return null;
    },
  );
  return null;
};

export default verifyJWT;
