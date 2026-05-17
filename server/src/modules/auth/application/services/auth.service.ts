import { Injectable } from "@nestjs/common";
import { RegisterDto, LoginDto, VerifyOtpDto } from "../dto/request";
import { UserResponseDto, AuthResponseDto, RegisterResponseDto } from "../dto/response";
import { RegisterUserUseCase, LoginUseCase, VerifyOtpUseCase, GoogleAuthUseCase, GoogleAuthDto } from "../useCases";

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
        private verifyOtpUseCase: VerifyOtpUseCase,
        private googleAuthUseCase: GoogleAuthUseCase,
    ) { }

    /**
     * Proxies the registration request to the specialized use case.
     */
    async register(register: RegisterDto): Promise<RegisterResponseDto> {
        return this.registerUseCase.execute(register);
    }

    /**
     * Proxies the login request to the specialized use case.
     */
    async login(login: LoginDto): Promise<AuthResponseDto> {
        return this.loginUseCase.execute(login);
    }

    /**
     * Proxies the OTP verification request to the specialized use case.
     */
    async verifyOtp(verifyOtp: VerifyOtpDto): Promise<UserResponseDto> {
        return this.verifyOtpUseCase.execute(verifyOtp);
    }

    /**
     * Proxies the Google Auth request to the specialized use case.
     */
    async googleLogin(profile: GoogleAuthDto): Promise<AuthResponseDto> {
        return this.googleAuthUseCase.execute(profile);
    }
}