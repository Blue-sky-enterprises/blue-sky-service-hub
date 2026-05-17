// user already exists exception for auth domain
export class UserAlreadyExistsException extends Error {
    constructor() {
        super("User already exists");
    }
}