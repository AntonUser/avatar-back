import { environment } from '../environment';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';

export const redisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,

  useFactory: async () => {
    const store = await redisStore({
      socket: {
        port: environment.redis.port,
        host: environment.redis.host,
        passphrase: environment.redis.password,
      },
    });
    return {
      store: () => store,
    };
  },
};
