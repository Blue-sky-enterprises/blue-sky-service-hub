import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { HealthService } from "../../infrastructure/services/health.service";
import { HealthEntity } from "../../domain/entities/health.entity";

@ApiTags("Health")
@Controller("health")
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @ApiOperation({ summary: "Check API health" })
    getHealth(): HealthEntity {
        return this.healthService.getHealth();
    }
}