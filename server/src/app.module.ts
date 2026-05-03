import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DiscoveryModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';

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
export class AppModule { }