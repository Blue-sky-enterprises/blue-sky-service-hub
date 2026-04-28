import { Injectable } from "@nestjs/common";
import { GetHealthUseCase } from "../../application/use-cases/get-health.use-case";
import { HealthEntity } from "../../domain/entities/health.entity";

@Injectable()
export class HealthService {
  constructor(private readonly useCase: GetHealthUseCase) {}

  getHealth(): HealthEntity {
    return this.useCase.execute();
  }
}