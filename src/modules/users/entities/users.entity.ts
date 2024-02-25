import { BaseEntity } from '../../../common/entities/base.entity';
import { IUsers } from '../interfaces/users.interface';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUsers {
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
