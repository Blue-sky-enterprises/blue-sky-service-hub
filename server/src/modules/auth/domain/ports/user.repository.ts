import { User } from "../entities/user.entity";

/**
 * UserRepository Interface (Port).
 *
 * Defines the contract for user persistence operations.
 * In hexagonal architecture, this is an "Output Port" that the
 * infrastructure layer must implement.
 */
export interface UserRepository {
    /**
     * Persists a new user to the storage.
     * @param user - The User domain entity to create
     * @returns The created User entity
     */
    create(user: User): Promise<User>;

    /**
     * Retrieves a user by their email address.
     * @param email - The email to search for
     * @returns The User entity if found, otherwise null
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Retrieves a user by their unique identifier.
     * @param id - The UUID of the user
     * @returns The User entity if found, otherwise null
     */
    findById(id: string): Promise<User | null>;
}