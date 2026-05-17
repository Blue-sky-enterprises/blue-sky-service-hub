import { IsEnum, IsNumberString, IsString } from 'class-validator';

export class EnvSchema {
  @IsNumberString()
  PORT!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsEnum(['development', 'production', 'test'])
  NODE_ENV!: 'development' | 'production' | 'test';

  @IsString()
  GOOGLE_CLIENT_ID!: string;

  @IsString()
  GOOGLE_CLIENT_SECRET!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  CLIENT_URL!: string;
}