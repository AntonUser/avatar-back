import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

export const GetUserPayload = createParamDecorator(
  (_: undefined, context: ExecutionContext): IJwtPayload => {
    const request = context.switchToHttp().getRequest();

    return request.user as IJwtPayload;
  },
);
