import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { IDrone } from '../interfaces/drone.interface';
import { DroneTypes } from '../enums/drone-types.enum';

@Entity('drone')
export class DroneEntity extends BaseEntity implements IDrone {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ enum: DroneTypes })
  type: DroneTypes;

  @ManyToOne(() => FileEntity, { nullable: true })
  image: FileEntity | null;

  @Column({ type: 'text', nullable: true })
  imageId: string | null;

  @Column({ type: 'text', nullable: true })
  cameraIp: string | null;

  @Column({ type: 'text', nullable: true })
  cameraLogin: string | null;

  @Column({ type: 'text', nullable: true })
  cameraPassword: string | null;
}
