import { User } from "../../domain";
import { UserResponseDto } from "../dto/response";

/**
 * AuthMapper.
 * 
 * Responsibilities:
 * - Translating between Domain Entities and Application DTOs.
 * - Ensures that the presentation layer only receives data it needs.
 */
export class AuthMapper {
    /**
     * Maps a User domain entity to a UserResponseDto.
     */
    static toResponse(user: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.id;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.email = user.email;
        dto.role = user.role;
        dto.createdAt = user.createdAt;
        dto.updatedAt = user.updatedAt;
        return dto;
    }
}
