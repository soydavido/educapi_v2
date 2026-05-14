import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { GlobalExceptionFilter } from '../src/common/errors/global-exception.filter';
import { Logger } from '../src/common/services/logger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestLogEntity } from '../src/database/models/request-log.entity';
import { getEnv } from '../src/common/utils/env';

const expressApp = express();
let initialized = false;

async function bootstrap() {
  if (initialized) return;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger: false,
  });

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'usersecretpasskey'],
    credentials: true,
  });

  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  const logger = app.get(Logger);
  const requestLogRepo = app.get(getRepositoryToken(RequestLogEntity, getEnv('DB_NAME')));

  expressApp.use(async (req: any, res: any, next: () => void) => {
    try {
      await requestLogRepo.save({
        endpoint: req.originalUrl,
        ip: req.ip,
        body: req.body ? JSON.stringify(req.body) : undefined,
        method: req.method,
        userSecretPasskey: req.headers['usersecretpasskey'] as string,
        hostname: req.hostname,
        direction: 'INCOMING',
      });
    } catch (e) {
      logger.error('Error guardando log de request', e);
    }
    next();
  });

  await app.init();
  initialized = true;
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  expressApp(req, res);
}
