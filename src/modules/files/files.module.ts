import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { S3Module } from '../s3/s3.module';
import { FilesController } from './controllers/files.controller';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [S3Module],
})
export class FilesModule {}
