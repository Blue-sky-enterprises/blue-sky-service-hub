/** DTO for authentication responses containing the access token and user info. */
export class AuthResponseDto {
    accessToken!: string;
    user!: {
        id: string;
        email: string;
    };
}