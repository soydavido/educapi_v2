import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLogEntity } from 'src/database/models/request-log.entity';
import { getEnv } from 'src/common/utils/env';
import { Logger } from '@nestjs/common';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  protected readonly logger = new Logger(ResponseLoggingInterceptor.name);

  constructor(
    @InjectRepository(RequestLogEntity, getEnv('DB_NAME'))
    private readonly logRepo: Repository<RequestLogEntity>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const ip = request.ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const endpoint = request.originalUrl;
    const hostname = request.hostname;
    const rawPasskey = request.headers['usersecretpasskey'] || request.headers['UserSecretPasskey'];
    const userSecretPasskey = Array.isArray(rawPasskey) ? rawPasskey[0] : rawPasskey;

    return next.handle().pipe(
      tap((data) => {
        // Guardar el log de respuesta OUTGOING
        this.saveResponseLog(data, endpoint, hostname, userSecretPasskey, ip, response.statusCode);
      }),
    );
  }

  private async saveResponseLog(
    body: any,
    endpoint: string,
    hostname: string,
    userSecretPasskey: string | undefined,
    ip: any,
    statusCode?: number,
  ) {
    try {
      const ipString = typeof ip === 'string' ? ip : JSON.stringify(ip);
      await this.logRepo.save({
        endpoint,
        ip: ipString,
        body: body ? JSON.stringify(body) : undefined,
        method: 'RESPONSE',
        userSecretPasskey: userSecretPasskey,
        hostname,
        direction: 'OUTGOING',
      });
    } catch (e) {
      this.logger.error('Error guardando log de response', e);
    }
  }
}
