import { IUserRepository, User, UserAlreadyExistsException, Role } from "../../domain";
import { RegisterDto } from "../dto/request";
import { UserResponseDto } from "../dto/response";
import { AuthMapper } from "../mappers";
import * as bcrypt from "bcrypt";

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
    constructor(private userRepo: IUserRepository) { }

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
            throw new UserAlreadyExistsException();
        }

        // 2. Security: Hash password before storage
        const hashedPassword = await bcrypt.hash(register.password, 10);

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date();
        otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

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
            false, // isVerified
            otp,
            otpExpiresAt,
            null // googleId
        ));

        console.log(`\n[MOCK EMAIL] OTP for ${register.email} is: ${otp}\n`);

        // 4. Return DTO
        return AuthMapper.toResponse(user);
    }
}