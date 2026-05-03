import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../../shared";
import { IUserRepository, User } from "../../../domain";
import { UserMapper } from "../../mappers";

/**
 * UserRepository (Adapter).
 *
 * Infrastructure implementation of the UserRepository port using Prisma.
 * This class is responsible for translating between Domain Entities
 * and Prisma Database Models.
 */
@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) { }

    /**
     * Creates a new user in the database.
     * Maps the domain entity to the Prisma create input.
     */
    async create(user: User): Promise<User> {
        const data = UserMapper.toPersistence(user);
        const created = await this.prisma.user.create({ data });
        return UserMapper.toDomain(created);
    }

    /**
     * Finds a user by email.
     */
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return UserMapper.toDomain(user);
    }

    /**
     * Finds a user by ID.
     */
    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return UserMapper.toDomain(user);
    }
}