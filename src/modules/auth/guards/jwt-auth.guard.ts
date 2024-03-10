import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isOptionalAuth = this.reflector.getAllAndOverride('isOptionalAuth', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isExistJwt = !!context.switchToHttp().getRequest()['headers'][
      'authorization'
    ];

    if (isPublic) {
      return true;
    }

    if (isOptionalAuth) {
      if (isExistJwt) {
        return super.canActivate(context);
      }
      return true;
    }

    return super.canActivate(context);
  }
}
