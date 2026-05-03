import { Module } from "@nestjs/common";
import { AuthController } from "./presentation";
import { UserRepository } from "./infrastructure";
import { RegisterUserUseCase, LoginUseCase } from "./application";
import { AuthService } from "./application";

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
            useFactory: (repo: UserRepository): LoginUseCase =>
                new LoginUseCase(repo),
            inject: [UserRepository],
        },
    ],
})
export class AuthModule { }