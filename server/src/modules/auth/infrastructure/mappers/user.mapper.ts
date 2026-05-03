import { User as PrismaUser, Role as PrismaRole } from "@prisma/client";
import { User, Role as DomainRole } from "../../domain";

/**
 * UserMapper.
 * 
 * Responsibilities:
 * - Translating between Prisma persistence models and Domain entities.
 * - Centralizing mapping logic to prevent duplication and decouple layers.
 */
export class UserMapper {
    /**
     * Maps a Prisma User model to a Domain User entity.
     */
    static toDomain(prismaUser: PrismaUser): User {
        return new User(
            prismaUser.id,
            prismaUser.firstName,
            prismaUser.lastName,
            prismaUser.email,
            prismaUser.password,
            prismaUser.role as unknown as DomainRole,
            prismaUser.createdAt,
            prismaUser.updatedAt,
        );
    }

    /**
     * Maps a Domain User entity to a Prisma persistence model format.
     * Useful for create/update operations.
     */
    static toPersistence(user: User) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role as unknown as PrismaRole,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
