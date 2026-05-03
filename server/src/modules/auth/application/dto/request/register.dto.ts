import {
    IsEmail,
    IsString,
    MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object for user registration.
 * 
 * Defines the required input for creating a new user account.
 * Uses 'class-validator' decorators to enforce business rules at the entry point.
 */
export class RegisterDto {
    /** User's first name */
    @ApiProperty({
        description: "User's first name",
        example: "abiram",
    })
    @IsString()
    firstName!: string;

    /** User's last name */
    @ApiProperty({
        description: "User's last name",
        example: "k",
    })
    @IsString()
    lastName!: string;

    /** Unique email address to be used for login */
    @ApiProperty({
        description: "Unique email address to be used for login",
        example: "abiram@example.com",
    })
    @IsEmail()
    email!: string;

    /** Plain-text password (min 6 characters) */
    @ApiProperty({
        description: "Plain-text password (min 6 characters)",
        example: "password123",
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password!: string;

    /** Password confirmation to prevent typing errors */
    @ApiProperty({
        description: "Password confirmation to prevent typing errors",
        example: "password123",
    })
    @IsString()
    confirmPassword!: string;
}