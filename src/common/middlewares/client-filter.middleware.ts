import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/models/user.entity';
import { RequestLogEntity } from 'src/database/models/request-log.entity';
import { getEnv } from 'src/common/utils/env';
import { Logger } from '@nestjs/common';

@Injectable()
export class ClientFilterMiddleware implements NestMiddleware {
  protected readonly logger = new Logger(ClientFilterMiddleware.name);

  constructor(
    @InjectRepository(UserEntity, getEnv('DB_NAME'))
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RequestLogEntity, getEnv('DB_NAME'))
    private readonly logRepo: Repository<RequestLogEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const rawPasskey = req.headers['usersecretpasskey'] || req.headers['UserSecretPasskey'];
    const userSecretPasskey = Array.isArray(rawPasskey) ? rawPasskey[0] : rawPasskey;

    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const body = req.body;
    const url = req.originalUrl;
    const endpoint = url;
    const hostname = req.hostname;

    // Guardar log de REQUEST INCOMING
    try {
      await this.logRepo.save({
        endpoint,
        ip: typeof ip === 'string' ? ip : JSON.stringify(ip),
        body: body ? JSON.stringify(body) : undefined,
        method: req.method,
        userSecretPasskey: userSecretPasskey,
        hostname,
        direction: 'INCOMING',
      });
    } catch (e) {
      this.logger.error('Error guardando log de request', e);
    }

    const sendResponse = (status: number, body: any) => {
      // add CORS headers to every manual response so browsers aren't blocked
      try {
        if (res && typeof (res as any).setHeader === 'function') {
          (res as any).setHeader('Access-Control-Allow-Origin', '*');
          (res as any).setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, usersecretpasskey');
          (res as any).setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
        } else if (res && typeof (res as any).set === 'function') {
          (res as any).set('Access-Control-Allow-Origin', '*');
          (res as any).set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, usersecretpasskey');
          (res as any).set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
        }
      } catch (_e) {
        // ignore header errors
      }

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
      // allow preflight without auth header
      if (req.method === 'OPTIONS') {
        return next();
      }

      const raw = (req.headers['usersecretpasskey'] || req.headers['UserSecretPasskey']) as
        | string
        | undefined;
      const header = Array.isArray(raw) ? raw[0] : raw;
      if (!header) {
        return sendResponse(401, { message: 'No se esta recibiendo el encabezado de autorizacion.' });
      }

      const user = await this.userRepo.findOne({ where: { secret: header } as any });
      if (!user) {
        return sendResponse(401, { message: 'No existe el usuario con el secreto proporcionado.' });
      }

      // attach minimal user info for downstream handlers
      (req as any).user = { ...(req as any).user, idUser: user.idUser };
      return next();
    } catch (err) {
      return sendResponse(500, { message: 'Error al validar el secreto del usuario.' });
    }
  }
}
