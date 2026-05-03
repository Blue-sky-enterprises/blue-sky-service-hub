// password mismatch exception for auth domain
export class PasswordMismatchException extends Error {
    constructor() {
        super("Passwords do not match");
    }
}