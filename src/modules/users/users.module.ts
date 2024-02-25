import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Module({ providers: [UsersService], controllers: [], exports: [UsersService] })
export class UsersModule {}
