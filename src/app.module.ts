import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './common/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeormConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
