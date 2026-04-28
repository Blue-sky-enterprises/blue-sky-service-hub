import { Module } from "@nestjs/common";
import { HealthController } from "./presentation/controllers/health.controller";
import { HealthService } from "./infrastructure/services/health.service";
import { GetHealthUseCase } from "./application/use-cases/get-health.use-case";

@Module({
  controllers: [HealthController],
  providers: [HealthService, GetHealthUseCase],
})
export class HealthModule {}