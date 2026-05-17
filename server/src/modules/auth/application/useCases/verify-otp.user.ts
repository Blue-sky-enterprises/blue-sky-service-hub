import { IUserRepository } from "../../domain";
import { UserResponseDto } from "../dto/response";
import { VerifyOtpDto } from "../dto/request";
import { AuthMapper } from "../mappers";

export class VerifyOtpUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(data: VerifyOtpDto): Promise<UserResponseDto> {
        const user = await this.userRepo.findByEmail(data.email);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.isVerified) {
            throw new Error("User is already verified");
        }

        if (user.otp !== data.otp) {
            throw new Error("Invalid OTP");
        }

        if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
            throw new Error("OTP has expired");
        }

        // Verify user and clear OTP
        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;

        const updatedUser = await this.userRepo.update(user);
        return AuthMapper.toResponse(updatedUser);
    }
}
