import { Module } from '@nestjs/common';
import { getEnv } from 'src/common/utils/env';
import { CrudModule } from './crud.module';

@Module({
  imports: [],
})
export class BaseHttpModule {}
