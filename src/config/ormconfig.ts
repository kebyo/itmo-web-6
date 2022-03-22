import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { tryNumber } from '@proscom/ui-utils';

import { typeormBaseDirectory } from './environment';
import { booleanEnv } from './tools';

console.info(
  `TypeORM configuration uses base directory '${typeormBaseDirectory}' in ${__filename}`,
);

export const typeormHost = process.env.TYPEORM_HOST;
export const typeormPort = tryNumber(process.env.TYPEORM_PORT, 5432);
export const typeormUser = process.env.TYPEORM_USERNAME;
export const typeormPassword = process.env.TYPEORM_PASSWORD;
export const typeormDatabase = process.env.TYPEORM_DATABASE;

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: typeormHost,
  port: typeormPort,
  username: typeormUser,
  password: typeormPassword,
  database: typeormDatabase,
  entities: [`${typeormBaseDirectory}/app/**/*.entity{.ts,.js}`],
  migrationsTableName: 'typeorm_migrations',
  migrations: [`${typeormBaseDirectory}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${typeormBaseDirectory}/migrations`,
  },
  logging: booleanEnv(process.env.DEBUG_SQL),
  uuidExtension: 'uuid-ossp',
  installExtensions: true,
};

// для того, чтобы работал скрипт build:diagram
export default ormConfig;