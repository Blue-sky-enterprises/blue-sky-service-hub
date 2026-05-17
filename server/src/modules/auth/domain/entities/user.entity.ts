import { Role } from "../enums/role.enum";

/**
 * User Domain Entity.
 *
 * This class represents the core User model in the Domain Layer.
 * It is independent of any database or external framework.
 * 
 * Following DDD principles, this entity is the "source of truth" for
 * user data within the application logic.
 */
export class User {
    /**
     * @param id - Unique UUID for the user
     * @param firstName - User's first name
     * @param lastName - User's last name
     * @param email - Unique email address
     * @param password - Hashed password string
     * @param role - System role (ADMIN, MANAGER, EMPLOYEE)
     * @param createdAt - Record creation timestamp
     * @param updatedAt - Record last update timestamp
     */
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string | null,
        public role: Role,
        public createdAt: Date,
        public updatedAt: Date,
        public isVerified: boolean = false,
        public otp: string | null = null,
        public otpExpiresAt: Date | null = null,
        public googleId: string | null = null,
    ) { }
}
