import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../../redis/services/redis.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtRefreshGuard
  extends AuthGuard('jwt-refresh')
  implements CanActivate
{
  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorization: string | undefined = context
      .switchToHttp()
      .getRequest()['headers']['authorization'];

    const token = authorization
      ? authorization.replace('Bearer ', '')
      : undefined;

    if (token) {
      return this.redisService
        .get<string>(this.authService.getRefreshTokenKey(token))
        .then((value) => {
          return Boolean(value);
        });
    }

    return false;
  }
}
