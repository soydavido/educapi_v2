
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnv } from './common/utils/env';
import { GlobalExceptionFilter } from './common/errors/global-exception.filter';
import { Logger } from './common/services/logger.service';
import cors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const port = Number(getEnv('APP_PORT', process.env.PORT ?? '3000'));

  // Enable CORS
  const fastifyInstance = app.getHttpAdapter().getInstance();
  await fastifyInstance.register(cors, {
    origin: true, // Allow all origins, or specify your React app URL
  });

  // Register global exception filter
  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  // Add hook to log 404 responses
  const logger = app.get(Logger);
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