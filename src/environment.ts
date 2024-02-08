import { config } from 'dotenv';
import * as env from 'env-var';

config();

export const environment = {
  app: {
    nodeEnv: env.get('NODE_ENV').default('dev').asString(),
    port: env.get('PORT').default('3000').asPortNumber(),
    host: env.get('HOST').default('localhost').asString(),
  },
  database: {
    host: env.get('PGSQL_HOST').required().default('localhost').asString(),
    port: env.get('PGSQL_PORT').required().default('3000').asPortNumber(),
    name: env.get('PGSQL_DATABASE').required().asString(),
    username: env.get('PGSQL_USERNAME').required().asString(),
    password: env.get('PGSQL_PASSWORD').required().asString(),
  },
};
