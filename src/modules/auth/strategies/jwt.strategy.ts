import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '../../../environment';
import { IJwtPayload } from '../../../common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.tokenKeys.accessKey,
    });
  }

  async validate(payload?: IJwtPayload): Promise<IJwtPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
