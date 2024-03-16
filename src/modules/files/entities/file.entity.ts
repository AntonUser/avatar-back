import { IFile } from '../interfaces/file.interface';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity('file')
export class FileEntity extends BaseEntity implements IFile {
  @Column({ type: 'text' })
  mimetype: string;

  @Column({ type: 'bigint', default: 0 })
  size: number;

  @DeleteDateColumn({ type: Date, nullable: true })
  deletedAt: Date | null;
}
