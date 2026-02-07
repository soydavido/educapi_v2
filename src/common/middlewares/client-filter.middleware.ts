import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/models/user.entity';
import { getEnv } from 'src/common/utils/env';

@Injectable()
export class ClientFilterMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity, getEnv('DB_NAME'))
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const sendResponse = (status: number, body: any) => {
      // Express-like response
      if (res && typeof (res as any).status === 'function') {
        return (res as any).status(status).json(body);
      }
      // Fastify-like reply
      if (res && typeof (res as any).code === 'function') {
        return (res as any).code(status).send(body);
      }
      // Fallback: ensure Content-Type and send JSON
      try {
        if (res && typeof (res as any).setHeader === 'function') {
          (res as any).setHeader('Content-Type', 'application/json');
        } else if (res && typeof (res as any).set === 'function') {
          (res as any).set('Content-Type', 'application/json');
        }
        (res as any).statusCode = status;
        (res as any).end && (res as any).end(JSON.stringify(body));
      } catch (_e) {
        // ignore
      }
    };

    try {
      
      const raw = (req.headers['usersecretpasskey'] || req.headers['UserSecretPasskey']) as
        | string
        | undefined;
      const header = Array.isArray(raw) ? raw[0] : raw;
      if (!header) {
        return sendResponse(401, { message: 'Missing UserSecretPasskey header' });
      }

      const user = await this.userRepo.findOne({ where: { secret: header } as any });
      if (!user) {
        return sendResponse(401, { message: 'Invalid UserSecretPasskey' });
      }

      // attach minimal user info for downstream handlers
      (req as any).user = { ...(req as any).user, idUser: user.idUser };
      return next();
    } catch (err) {
      return sendResponse(500, { message: 'Error validating UserSecretPasskey' });
    }
  }
}
