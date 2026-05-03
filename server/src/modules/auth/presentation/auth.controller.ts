import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../application/services/auth.service";
import { RegisterDto } from "../application/dto/request/register.dto";
import { UserResponseDto } from "../application/dto/response/user.response.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

/**
 * AuthController (Presentation Layer).
 *
 * Defines the HTTP interface for authentication endpoints.
 * Routes are prefixed with '/api/auth' (via global prefix and @Controller).
 */
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * POST /api/auth/register
     * Registers a new user in the system.
     */
    @Post("register")
    @ApiOperation({ summary: "Register a new user" })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ 
        status: 201, 
        description: "User successfully registered.",
        type: UserResponseDto 
    })
    @ApiResponse({ status: 400, description: "Bad Request - Validation failed." })
    @ApiResponse({ status: 409, description: "Conflict - User already exists." })
    async register(@Body() body: RegisterDto): Promise<UserResponseDto> {
        return this.authService.register(body);
    }
}