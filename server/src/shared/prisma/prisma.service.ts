import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * PrismaService.
 *
 * This service manages the connection to the PostgreSQL database via Prisma.
 * It extends PrismaClient to provide a unified database interface.
 * 
 * Note: Since Prisma 7, a driver adapter (PrismaPg) is required when
 * using custom pooling or certain environments.
 */
@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    /**
     * Initializes the PrismaClient with a PostgreSQL driver adapter.
     */
    constructor() {
        // Create a pg connection pool from the DATABASE_URL environment variable
        // 'max: 10' limits the pool size to prevent database exhaustion.
        const pool = new Pool({ 
            connectionString: process.env.DATABASE_URL, 
            max: 10 
        });

        // Initialize the Prisma adapter (Required for Prisma 7 compatibility)
        const adapter = new PrismaPg(pool);
        super({ adapter });
    }

    /**
     * Lifecycle hook: Connects to the database when the application starts.
     */
    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    /**
     * Lifecycle hook: Disconnects from the database when the application shuts down.
     */
    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}