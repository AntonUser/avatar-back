import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { environment } from '../../environment';

export class TypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      name: database,
      host,
      port,
      username,
      password,
    } = environment.database;

    return {
      type: 'postgres',
      database,
      host,
      port,
      username,
      password,
      synchronize: false,
      keepConnectionAlive: true,
      migrationsRun: false,
      retryAttempts: 10,
      retryDelay: 3000,
      entities: [`src/modules/**/entities/*.entity.{js,ts}`],
      migrationsTableName: 'migrations',
      migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
    };
  }
}
