import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { v4 } from 'uuid';
import { S3Service } from '../../s3/services/s3.service';
import { IFile } from '../interfaces/file.interface';
@Injectable()
export class FilesService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly s3Service: S3Service,
  ) {}

  upload(file: Express.Multer.File): Promise<IFile> {
    return this.entityManager.transaction(async (manager) => {
      const newFile = manager.create(FileEntity, {
        id: v4(),
        size: file.size,
        mimetype: file.mimetype,
      });

      await this.s3Service.uploadToS3(newFile, file.buffer);

      await manager.save(newFile);
      return newFile;
    });
  }

  async remove(names: string[]): Promise<boolean> {
    return this.entityManager.transaction(async (manager) => {
      await this.s3Service.removeFromS3(names);
      await manager.getRepository(FileEntity).softDelete({ id: In(names) });
      return true;
    });
  }
}
