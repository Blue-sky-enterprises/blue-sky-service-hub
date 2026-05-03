import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../../shared";
import { UserRepository } from "../../../domain/ports/user.repository";
import { User } from "../../../domain/entities/user.entity";
import { User as PrismaUser } from "@prisma/client";

/**
 * PrismaUserRepository (Adapter).
 *
 * Infrastructure implementation of the UserRepository port using Prisma.
 * This class is responsible for translating between Domain Entities
 * and Prisma Database Models.
 */
@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }

    /**
     * Creates a new user in the database.
     * Maps the domain entity to the Prisma create input.
     */
    async create(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
        return this.mapToEntity(created);
    }

    /**
     * Finds a user by email.
     */
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return this.mapToEntity(user);
    }

    /**
     * Finds a user by ID.
     */
    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return this.mapToEntity(user);
    }

    /**
     * Mapper: Prisma Model -> Domain Entity.
     * Ensures the rest of the application doesn't leak Prisma-specific types.
     */
    private mapToEntity(prismaUser: PrismaUser): User {
        return new User(
            prismaUser.id,
            prismaUser.firstName,
            prismaUser.lastName,
            prismaUser.email,
            prismaUser.password,
            prismaUser.role,
            prismaUser.createdAt,
            prismaUser.updatedAt,
        );
    }
}