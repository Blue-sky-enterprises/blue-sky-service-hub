import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./presentation";
import { UserRepository } from "./infrastructure";
import { RegisterUserUseCase, LoginUseCase, VerifyOtpUseCase, GoogleAuthUseCase } from "./application";
import { AuthService } from "./application";
import { GoogleStrategy } from "./infrastructure/strategies/google.strategy";

/**
 * AuthModule.
 *
 * This module encapsulates all authentication and user management logic.
 * It wires together the presentation, application, and infrastructure layers.
 * 
 * Uses the factory pattern for UseCases to keep them decoupled from 
 * infrastructure implementations (DI using the interface port).
 */
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || "fallback_secret_key_123",
            signOptions: { expiresIn: "1d" },
        }),
    ],
    controllers: [AuthController],
    providers: [
        UserRepository,
        AuthService,
        {
            provide: RegisterUserUseCase,
            useFactory: (repo: UserRepository): RegisterUserUseCase =>
                new RegisterUserUseCase(repo),
            inject: [UserRepository],
        },
        {
            provide: LoginUseCase,
            useFactory: (repo: UserRepository, jwt: JwtService): LoginUseCase =>
                new LoginUseCase(repo, jwt),
            inject: [UserRepository, JwtService],
        },
        {
            provide: VerifyOtpUseCase,
            useFactory: (repo: UserRepository): VerifyOtpUseCase =>
                new VerifyOtpUseCase(repo),
            inject: [UserRepository],
        },
        {
            provide: GoogleAuthUseCase,
            useFactory: (repo: UserRepository, jwt: JwtService): GoogleAuthUseCase =>
                new GoogleAuthUseCase(repo, jwt),
            inject: [UserRepository, JwtService],
        },
        GoogleStrategy,
    ],
})
export class AuthModule { }