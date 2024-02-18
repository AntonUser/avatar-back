import { repl } from '@nestjs/core';
import { AppModule } from './src/app.module';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function bootstrap(): Promise<void> {
  await repl(AppModule);
}
bootstrap();
