import { Injectable } from "@nestjs/common";
import { RegisterDto, LoginDto } from "../dto/request";
import { UserResponseDto } from "../dto/response";
import { RegisterUserUseCase, LoginUseCase } from "../useCases";

/**
 * AuthService (Application Service).
 *
 * This service acts as a facade for all authentication-related use cases.
 * It provides a clean API for the controller to interact with.
 */
@Injectable()
export class AuthService {
    constructor(
        private registerUseCase: RegisterUserUseCase,
        private loginUseCase: LoginUseCase,
    ) { }

    /**
     * Proxies the registration request to the specialized use case.
     */
    async register(register: RegisterDto): Promise<UserResponseDto> {
        return this.registerUseCase.execute(register);
    }

    /**
     * Proxies the login request to the specialized use case.
     */
    async login(login: LoginDto): Promise<UserResponseDto> {
        return this.loginUseCase.execute(login);
    }
}