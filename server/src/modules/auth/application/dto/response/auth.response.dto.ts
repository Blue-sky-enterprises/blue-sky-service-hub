import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./user.response.dto";

/** DTO for authentication responses containing the access token and user info. */
export class AuthResponseDto {
    @ApiProperty({ description: "JWT Access Token" })
    accessToken!: string;

    @ApiProperty({ description: "User Profile", type: () => UserResponseDto })
    user!: UserResponseDto;
}