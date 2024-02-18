import { Injectable } from '@nestjs/common';
import { IUsers } from '../interfaces/users.interface';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  create(dto: CreateUserDTO): IUsers {
    return this.entityManager.getRepository(UsersEntity).create(dto);
  }
}
