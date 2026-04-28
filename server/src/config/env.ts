import * as dotenv from 'dotenv';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvSchema } from './env.schema.js';
dotenv.config();
const envInstance = plainToInstance(EnvSchema, process.env);

const errors = validateSync(envInstance, {
    skipMissingProperties: false,
});

if (errors.length > 0) {
    console.error('◈ Invalid environment variables');
    console.error(errors.map(e => ({
        property: e.property,
        constraints: e.constraints
    })));
    process.exit(1);
}

export const env = envInstance;