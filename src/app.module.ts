import { Module } from '@nestjs/common';
import { LoggerModule } from './common/modules/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './common/modules/database.module';
import { appDataSourceOptions } from './database/data-source';

@Module({
  imports: [
    LoggerModule,
    ScheduleModule.forRoot(),
    DatabaseModule.forConnections(appDataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
