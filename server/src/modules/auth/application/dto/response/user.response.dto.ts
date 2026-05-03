import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object for user responses.
 * 
 * This class defines the structure of user data returned to clients.
 * It excludes sensitive information like passwords.
 */
export class UserResponseDto {
    /** Unique identifier for the user */
    @ApiProperty({
        description: "Unique identifier for the user",
        example: "550e8400-e29b-41d4-a716-446655440000",
    })
    id!: string;

    /** User's first name */
    @ApiProperty({
        description: "User's first name",
        example: "Abiram",
    })
    firstName!: string;

    /** User's last name */
    @ApiProperty({
        description: "User's last name",
        example: "K",
    })
    lastName!: string;

    /** User's email address */
    @ApiProperty({
        description: "User's email address",
        example: "abiram@example.com",
    })
    email!: string;

    /** User's assigned role in the system */
    @ApiProperty({
        description: "User's assigned role in the system",
        enum: Role,
        example: Role.EMPLOYEE,
    })
    role!: Role;

    /** Timestamp when the user record was created */
    @ApiProperty({
        description: "Timestamp when the user record was created",
        example: "2024-03-05T12:00:00Z",
    })
    createdAt!: Date;

    /** Timestamp when the user record was last updated */
    @ApiProperty({
        description: "Timestamp when the user record was last updated",
        example: "2024-03-05T12:00:00Z",
    })
    updatedAt!: Date;
}
