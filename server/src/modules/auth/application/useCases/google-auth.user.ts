import { IUserRepository, User, Role } from "../../domain";
import { AuthResponseDto } from "../dto/response";
import { AuthMapper } from "../mappers";
import { JwtService } from "@nestjs/jwt";

export class GoogleAuthDto {
    email!: string;
    firstName!: string;
    lastName!: string;
    googleId!: string;
}

export class GoogleAuthUseCase {
    constructor(
        private userRepo: IUserRepository,
        private jwtService: JwtService
    ) {}

    async execute(profile: GoogleAuthDto): Promise<AuthResponseDto> {
        let user = await this.userRepo.findByEmail(profile.email);

        if (!user) {
            // Create a new user since one doesn't exist
            user = await this.userRepo.create(new User(
                crypto.randomUUID(),
                profile.firstName,
                profile.lastName,
                profile.email,
                null, // No password
                Role.EMPLOYEE,
                new Date(),
                new Date(),
                true, // Verified because email is from Google
                null,
                null,
                profile.googleId
            ));
        } else if (!user.googleId) {
            // User exists but hasn't linked Google account yet
            user.googleId = profile.googleId;
            user.isVerified = true;
            user = await this.userRepo.update(user);
        }

        // Generate JWT
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: AuthMapper.toResponse(user)
        };
    }
}
