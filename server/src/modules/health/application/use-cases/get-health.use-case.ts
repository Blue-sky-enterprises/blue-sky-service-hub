import { HealthEntity } from "../../domain/entities/health.entity";

export class GetHealthUseCase {
  execute(): HealthEntity {
    return new HealthEntity("ok", new Date().toISOString());
  }
}