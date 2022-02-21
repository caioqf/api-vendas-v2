import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void{

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new AppError('No authentication token on header of the request.');
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = verify(token, auth.jwt.secret);
    
    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    }
    
    next();

  } 
  catch {
    throw new AppError('Invalid JWT token.');
  }
}
 