import { Module } from '@nestjs/common';
import { LoggerModule } from './common/modules/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './common/modules/database.module';
import { appDataSourceOptions } from './database/data-source';
import { BaseHttpModule } from './modules/base-http.module';
import { CardModule } from './api/card/card.module';

@Module({
  imports: [
    DatabaseModule.forConnections(appDataSourceOptions),
    LoggerModule,
    ScheduleModule.forRoot(),
    BaseHttpModule,
    CardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
