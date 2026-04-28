import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    DiscoveryModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }