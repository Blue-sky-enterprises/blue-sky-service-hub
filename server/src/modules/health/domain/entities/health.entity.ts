export class HealthEntity {
  constructor(
    public readonly status: string,
    public readonly timestamp: string
  ) {}
}