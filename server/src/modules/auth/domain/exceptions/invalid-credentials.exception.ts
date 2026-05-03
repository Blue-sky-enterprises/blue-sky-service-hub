// invalid credentials exception for auth domain
export class InvalidCredentialsException extends Error {
    constructor() {
        super("Invalid email or password");
    }
}