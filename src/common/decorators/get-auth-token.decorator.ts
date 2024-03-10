import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization: string | undefined = request.headers['authorization'];
    return authorization.split(' ')[1];
  },
);
