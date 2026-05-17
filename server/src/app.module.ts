import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DiscoveryModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { RequestLoggerMiddleware } from './common/logger/request-logger.middleware';

@Module({
  imports: [
    DiscoveryModule,
    HealthModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}