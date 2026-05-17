import { IUserRepository, User, InvalidCredentialsException } from "../../domain";
import { LoginDto } from "../dto/request";
import { AuthResponseDto } from "../dto/response";
import { AuthMapper } from "../mappers";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

/**
 * LoginUseCase.
 *
 * Application logic for authenticating a user.
 */
export class LoginUseCase {
    constructor(
        private userRepo: IUserRepository,
        private jwtService: JwtService
    ) { }

    /**
     * Executes the login logic.
     * 
     * @param login - Input data (email, password)
     * @returns Auth response containing JWT and user data
     * @throws InvalidCredentialsException if email or password is wrong
     */
    async execute(login: LoginDto): Promise<AuthResponseDto> {
        // 1. Find user by email
        const user = await this.userRepo.findByEmail(login.email);
        if (!user || !user.password) {
            throw new InvalidCredentialsException();
        }

        // 2. Verify password
        const isPasswordValid = await bcrypt.compare(login.password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        // 3. Check if user is verified
        if (!user.isVerified) {
            throw new Error("Please verify your email to log in.");
        }

        // 4. Generate JWT
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        // 5. Return AuthResponseDto
        return {
            accessToken,
            user: AuthMapper.toResponse(user)
        };
    }
}
