import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerModule } from './common/modules/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './common/modules/database.module';
import { appDataSourceOptions } from './database/data-source';
import { BaseHttpModule } from './modules/base-http.module';
import { CardModule } from './api/card/card.module';
import { ClientFilterMiddleware } from './common/middlewares/client-filter.middleware';
import { getEnv } from './common/utils/env';
import { UserEntity } from './database/models/user.entity';

@Module({
  imports: [
    LoggerModule,
    ScheduleModule.forRoot(),
    DatabaseModule.forConnections(appDataSourceOptions),
    // Make the UserEntity repository available for the middleware
    DatabaseModule.forEntities(getEnv('DB_NAME'), [UserEntity]),
    BaseHttpModule,
    CardModule,
  ],
  controllers: [],
  providers: [ClientFilterMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientFilterMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
