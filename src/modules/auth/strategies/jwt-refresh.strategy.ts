import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { environment } from '../../../environment';
import { IJwtPayload } from '../../../common/interfaces/jwt-payload.interface';
import { UsersEntity } from '../../users/entities/users.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.tokenKeys.refreshKey,
    });
  }

  async validate(payload: IJwtPayload) {
    const { id } = payload;
    const user = await this.entityManager
      .getRepository(UsersEntity)
      .findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
