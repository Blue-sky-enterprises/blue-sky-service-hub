import { ApiProperty } from "@nestjs/swagger";

export class HealthEntity {
  @ApiProperty({
    example: 'ok',
    description: 'Current health status of the API',
  })
  status: string;

  @ApiProperty({
    example: '2026-04-28T10:30:00.000Z',
    description: 'Timestamp when health was checked',
  })
  timestamp: string;

  constructor(status: string, timestamp: string) {
    this.status = status;
    this.timestamp = timestamp;
  }
}