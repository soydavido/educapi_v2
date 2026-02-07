
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnv } from './common/utils/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const port = Number(getEnv('APP_PORT', process.env.PORT ?? '3000'));
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
}

bootstrap();