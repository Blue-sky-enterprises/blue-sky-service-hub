import { Injectable } from "@nestjs/common";
import { RegisterUserUseCase } from "../useCases/register.user";
import { RegisterDto } from "../dto/request/register.dto";
import { UserResponseDto } from "../dto/response/user.response.dto";

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
    ) { }

    /**
     * Proxies the registration request to the specialized use case.
     */
    async register(register: RegisterDto): Promise<UserResponseDto> {
        return this.registerUseCase.execute(register);
    }
}