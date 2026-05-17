import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object for login requests.
 */
export class LoginDto {
    /** User's email address */
    @ApiProperty({
        description: "User's email address",
        example: "abiram@example.com",
    })
    @IsEmail()
    email!: string;

    /** User's password */
    @ApiProperty({
        description: "User's password",
        example: "password123",
    })
    @IsString()
    @MinLength(6)
    password!: string;
}
