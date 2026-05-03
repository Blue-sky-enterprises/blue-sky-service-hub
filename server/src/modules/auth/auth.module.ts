import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/auth.controller";
import { PrismaUserRepository } from "./infrastructure/persistence/prisma/user.repository";
import { RegisterUserUseCase } from "./application/useCases/register.user";
import { AuthService } from "./application/services/auth.service";

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
        PrismaUserRepository,
        AuthService,
        {
            /**
             * We provide the UseCase as an injectable class, but 
             * manually inject the Prisma repository implementation.
             */
            provide: RegisterUserUseCase,
            useFactory: (repo: PrismaUserRepository): RegisterUserUseCase =>
                new RegisterUserUseCase(repo),
            inject: [PrismaUserRepository],
        },
    ],
})
export class AuthModule { }