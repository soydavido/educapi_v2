import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '../services/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLogEntity } from 'src/database/models/request-log.entity';
import { getEnv } from 'src/common/utils/env';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(RequestLogEntity, getEnv('DB_NAME'))
    private readonly logRepo: Repository<RequestLogEntity>,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message || 'Not Found';
      this.logger.warn(`404 Not Found: ${request.method} ${request.url}`);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Guardar log de respuesta de error (sin esperar)
    this.saveResponseLog(request, responseBody);

    // Responder al cliente
    if (typeof response.code === 'function') {
      // Fastify
      response.code(status).send(responseBody);
    } else if (typeof response.status === 'function') {
      // Express
      response.status(status);
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(responseBody));
    } else {
      response.statusCode = status;
      response.end(JSON.stringify(responseBody));
    }
  }

  private async saveResponseLog(request: any, responseBody: any): Promise<void> {
    try {
      const ip = request.ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const rawPasskey = request.headers['usersecretpasskey'] || request.headers['UserSecretPasskey'];
      const userSecretPasskey = Array.isArray(rawPasskey) ? rawPasskey[0] : rawPasskey;

      await this.logRepo.save({
        endpoint: request.originalUrl,
        ip: typeof ip === 'string' ? ip : JSON.stringify(ip),
        body: JSON.stringify(responseBody),
        method: 'RESPONSE',
        userSecretPasskey: userSecretPasskey,
        hostname: request.hostname,
        direction: 'OUTGOING',
      });
    } catch (e) {
      this.logger.error('Error guardando log de response en exception filter', e);
    }
  }
}