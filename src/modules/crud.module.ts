import { DynamicModule, Module, Type } from '@nestjs/common';
import { DatabaseModule } from './database.module';

interface CrudFeatureOptions {
  entity: any;
  controller: Type<any>;
  service: Type<any>;
  connectionName: string; // p.ej. getEnv('DB_NAME')
}

@Module({})
export class CrudModule {
  static forFeature(options: CrudFeatureOptions): DynamicModule {
    const { entity, controller, service, connectionName } = options;

    return {
      module: CrudModule,
      imports: [DatabaseModule.forEntities(connectionName, [entity])],
      controllers: [controller],
      providers: [service],
      exports: [service],
    };
  }
}
