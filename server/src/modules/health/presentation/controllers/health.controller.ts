import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiHeader, ApiBearerAuth } from "@nestjs/swagger";
import { HealthService } from "../../infrastructure/services/health.service";
import { HealthEntity } from "../../domain/entities/health.entity";

@ApiTags("Health")

@Controller("health")
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @ApiOperation({ summary: "Check API health" })
    @ApiOkResponse({
        description: 'API is healthy',
        type: HealthEntity,
    })
    @ApiHeader({
        name: 'x-request-id',
        description: 'Request tracking ID',
        required: false,
    })
    @ApiBearerAuth()
    getHealth(): HealthEntity {
        return this.healthService.getHealth();
    }
}