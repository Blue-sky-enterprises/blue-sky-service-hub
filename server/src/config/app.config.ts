import { env } from './env.js';

export const appConfig = {
  port: Number(env.PORT),
  isDev: env.NODE_ENV === 'development',
};