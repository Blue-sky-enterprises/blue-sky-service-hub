import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./user.response.dto";

export class RegisterResponseDto {
    @ApiProperty()
    message!: string;

    @ApiProperty()
    otp!: string;

    @ApiProperty({ type: () => UserResponseDto })
    user!: UserResponseDto;
}
