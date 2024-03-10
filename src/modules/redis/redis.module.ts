import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '../../config/redis.config';
import { RedisService } from './services/redis.service';

@Module({
  imports: [CacheModule.registerAsync(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
