import { UserRepository } from "../../domain/ports/user.repository";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../dto/request/register.dto";
import { UserResponseDto } from "../dto/response/user.response.dto";
import { User } from "../../domain/entities/user.entity";
import { Role } from "@prisma/client";

/**
 * RegisterUserUseCase.
 *
 * Application logic for registering a new user.
 * 
 * Responsibilities:
 * 1. Check if user already exists.
 * 2. Hash the plain-text password.
 * 3. Create a new User domain entity.
 * 4. Persist the user via the repository port.
 */
export class RegisterUserUseCase {
    constructor(private userRepo: UserRepository) { }

    /**
     * Executes the registration logic.
     * 
     * @param register - Input data (first name, last name, email, password)
     * @returns User response data (excluding password)
     * @throws Error if the user already exists
     */
    async execute(register: RegisterDto): Promise<UserResponseDto> {
        // 1. Business Rule: Email must be unique
        const existing = await this.userRepo.findByEmail(register.email);
        if (existing) {
            throw new Error("User already exists");
        }

        // 2. Security: Hash password before storage
        const hashedPassword = await bcrypt.hash(register.password, 10);

        // 3. Domain Logic: Create the entity
        const user = await this.userRepo.create(new User(
            crypto.randomUUID(),
            register.firstName,
            register.lastName,
            register.email,
            hashedPassword,
            Role.EMPLOYEE, // Default role for new registrations
            new Date(),
            new Date(),
        ));

        // 4. Return DTO
        return this.mapToResponse(user);
    }

    /**
     * Maps the User domain entity to a UserResponseDto.
     */
    private mapToResponse(user: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.id;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.email = user.email;
        dto.role = user.role;
        dto.createdAt = user.createdAt;
        dto.updatedAt = user.updatedAt;
        return dto;
    }
}