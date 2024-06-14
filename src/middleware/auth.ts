import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/configs/general.config';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token not provided');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) throw new UnauthorizedException('Invalid token');

    const [scheme, token] = parts;

    if (scheme.toLowerCase() !== 'bearer')
        throw new UnauthorizedException('Token malformatted');

    try {
      jwt.verify(token, SECRET_KEY); 
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
