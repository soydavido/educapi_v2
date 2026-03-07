import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnv } from './common/utils/env';
import { GlobalExceptionFilter } from './common/errors/global-exception.filter';
import { Logger } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const port = Number(getEnv('APP_PORT', process.env.PORT ?? '3000'));

  // Extraer las variables de entorno para los orígenes permitidos
  // Si no existe, usamos un fallback seguro o permitimos todo solo en desarrollo
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : true; // Cambia a 'true' solo si estás en un entorno local de desarrollo

  // 1. Usar el método nativo de NestJS para CORS
  app.enableCors({
    origin: true, // Cambiado de '*' a 'true' para que refleje el origen dinámicamente
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'usersecretpasskey' // <--- Crucial que esté aquí
    ],
    credentials: true,
  });

  // Register global exception filter
  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  const fastifyInstance = app.getHttpAdapter().getInstance();
  const logger = app.get(Logger);

  // Add hook to log 404 responses
  fastifyInstance.addHook('onSend', (request, reply, payload, done) => {
    if (reply.statusCode === 404) {
      logger.warn(`404 Not Found: ${request.method} ${request.url}`);
    }
    done();
  });

  await app.listen(port, '0.0.0.0');

  // Use custom logger for startup message
  logger.log(`Server listening on port ${port}`);
}

bootstrap();