import { Injectable } from '@nestjs/common';
import { IUsers } from '../interfaces/users.interface';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { environment } from '../../../environment';

@Injectable()
export class UsersService {
  private alias = 'users';

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async create(dto: CreateUserDTO): Promise<IUsers> {
    dto.password = await bcrypt.hash(
      dto.password,
      environment.app.passwordSalt,
    );

    return this.entityManager.getRepository(UsersEntity).save(dto);
  }

  findByEmailOrPhone(emailOrPhone: string): Promise<IUsers> {
    const query = this.entityManager
      .getRepository(UsersEntity)
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.email = :emailOrPhone`, { emailOrPhone })
      .orWhere(`${this.alias}.phoneNumber = :emailOrPhone`, { emailOrPhone });

    return query.getOneOrFail();
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
