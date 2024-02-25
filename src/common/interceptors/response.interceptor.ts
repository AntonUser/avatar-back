import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CommonResponseRTO } from '../rto/common-response.rto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CommonResponseRTO<unknown>> {
    const url = String(context.switchToHttp()?.getRequest()?.url);
    if (url.includes('hook-cp')) {
      return next.handle();
    }
    const code = context.switchToHttp().getResponse()?.statusCode ?? 200;
    return next.handle().pipe(
      map((data) => {
        return {
          code,
          data,
          error: null,
        };
      }),
    );
  }
}
