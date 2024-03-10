import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set<T>(key: string, value: T): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
