import { IsEnum, IsNumberString, IsString } from 'class-validator';

export class EnvSchema {
  @IsNumberString()
  PORT!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsEnum(['development', 'production', 'test'])
  NODE_ENV!: 'development' | 'production' | 'test';
}