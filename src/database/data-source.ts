import 'dotenv/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  createDataSourceOptions,
  loadDbConfig,
} from '../common/utils/db-config';
import { getEnv } from '../common/utils/env';

let cliDataSource: DataSource;

// MAIN datasource: only pick up entities that belong to the main DB (kept under src/database/models)
const mainOptions = createDataSourceOptions(
  loadDbConfig(
    'DB_',
    getEnv('DB_NAME'),
    // src/database/migrations/main/*.ts
    join(__dirname, 'migrations', 'main', '*.ts'),
    // src/database/models/**/*.entity.ts
    join(__dirname, 'models', '**', '*.entity{.ts,.js}'),
  ),
);

const options: DataSourceOptions[] = [mainOptions];

export const appDataSourceOptions: DataSourceOptions[] = options;

switch (process.env.DATASOURCE_NAME) {
  case 'main':
  default:
    cliDataSource = new DataSource(mainOptions);
    break;
}

export default cliDataSource;
