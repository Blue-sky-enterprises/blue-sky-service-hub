import { IUserRepository, User, InvalidCredentialsException } from "../../domain";
import { LoginDto, UserResponseDto, AuthMapper } from "../";
import * as bcrypt from "bcrypt";

/**
 * LoginUseCase.
 *
 * Application logic for authenticating a user.
 */
export class LoginUseCase {
    constructor(private userRepo: IUserRepository) { }

    /**
     * Executes the login logic.
     * 
     * @param login - Input data (email, password)
     * @returns User response data
     * @throws InvalidCredentialsException if email or password is wrong
     */
    async execute(login: LoginDto): Promise<UserResponseDto> {
        // 1. Find user by email
        const user = await this.userRepo.findByEmail(login.email);
        if (!user) {
            throw new InvalidCredentialsException();
        }

        // 2. Verify password
        const isPasswordValid = await bcrypt.compare(login.password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        // 3. Return user data (DTO)
        return AuthMapper.toResponse(user);
    }
}
