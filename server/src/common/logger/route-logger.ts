import { INestApplication } from '@nestjs/common';
import { logger } from './app-logger.js';

type RouteLayer = {
  route?: {
    path: string;
    methods: Record<string, boolean>;
  };
};

export function logRoutes(app: INestApplication): void {
  const server = app.getHttpServer();

  const router = (server as unknown as { _events?: { request?: { _router?: { stack: RouteLayer[] } } } })
    ._events?.request?._router;

  if (!router) {
    logger.warn('⚠️ Unable to detect routes');
    return;
  }

  logger.info('📌 Registered Routes:\n');

  router.stack
    .filter((layer: RouteLayer) => layer.route)
    .forEach((layer: RouteLayer) => {
      const route = layer.route!;
      const methods = Object.keys(route.methods)
        .map((m) => m.toUpperCase())
        .join(', ');

      logger.info(`${methods.padEnd(10)} ${route.path}`);
    });
}