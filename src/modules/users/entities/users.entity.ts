import { BaseEntity } from '../../../common/entities/base.entity';
import { IUsers } from '../interfaces/users.interface';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUsers {
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
