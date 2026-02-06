
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnv } from './common/utils/env';
import fastifyCookie from 'fastify-cookie';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserEntity } from './database/models/user.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const fastify = app.getHttpAdapter().getInstance();

  // register cookie parser for Fastify
  try {
    await fastify.register(fastifyCookie);
  } catch (e) {
    // ignore if already registered or plugin unavailable
  }

  // Obtain TypeORM DataSource from Nest's DI container
  let dataSource: DataSource | undefined;
  try {
    // Try default token
    const defaultToken = getDataSourceToken();
    dataSource = app.get<DataSource>(defaultToken);
  } catch (errDefault) {
    try {
      // Try using connection name from env (DB_NAME)
      const connName = process.env.DB_NAME;
      if (connName) {
        const namedToken = getDataSourceToken(connName);
        dataSource = app.get<DataSource>(namedToken);
      }
    } catch (errNamed) {
      try {
        // Last resort: try retrieving by class token
        dataSource = app.get(DataSource);
      } catch (err) {
        console.warn('DataSource not available for UserSecret middleware');
      }
    }
  }

  // Fastify preHandler hook: validate header UserSecretPasskey against tb_user.tx_secret
  fastify.addHook('preHandler', async (request: any, reply: any) => {
    try {
      const header = (request.headers && (request.headers['usersecretpasskey'] || request.headers['UserSecretPasskey'])) as
        | string
        | undefined;

      if (!header) {
        // No header — reject
        reply.status(401).send({ message: 'Missing UserSecretPasskey header' });
        return;
      }

      if (!dataSource) {
        reply.status(500).send({ message: 'Server misconfiguration' });
        return;
      }

      const repo = dataSource.getRepository(UserEntity);
      const user = await repo.findOne({ where: { secret: header } as any });
      if (!user) {
        reply.status(401).send({ message: 'Invalid UserSecretPasskey' });
        return;
      }

      // Attach found user id to request for downstream usage
      request.user = { ...(request.user || {}), idUser: user.idUser };
    } catch (err) {
      // On errors, reject
      reply.status(500).send({ message: 'Error validating UserSecretPasskey' });
    }
  });

  const port = Number(getEnv('APP_PORT', process.env.PORT ?? '3000'));
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
}

bootstrap();