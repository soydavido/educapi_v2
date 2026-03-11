import { Injectable, NestMiddleware, UnauthorizedException, HttpException } from '@nestjs/common';
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

    // El logging INCOMING se maneja en el hook de Fastify en main.ts

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
        throw new UnauthorizedException('No se esta recibiendo el encabezado de autorizacion.');
      }
      
      const user = await this.userRepo.findOne({ where: { secret: header } as any });
      if (!user) {
        throw new UnauthorizedException('No existe el usuario con el secreto proporcionado.');
      }

      // attach minimal user info for downstream handlers
      (req as any).user = { ...(req as any).user, idUser: user.idUser };
      return next();
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Error al validar el secreto del usuario.', 500);
    }
  }
}
