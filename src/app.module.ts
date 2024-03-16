import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './modules/redis/redis.module';
import { S3Module } from './modules/s3/s3.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeormConfig }),
    UsersModule,
    AuthModule,
    RedisModule,
    S3Module,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
