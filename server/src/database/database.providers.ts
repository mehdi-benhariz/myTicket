import { databaseConfig } from './database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): TypeOrmModuleOptions => databaseConfig,
  },
];
