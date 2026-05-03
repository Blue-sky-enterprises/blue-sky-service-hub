import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../application";
import { RegisterDto, LoginDto, UserResponseDto } from "../application";
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

    /**
     * POST /api/auth/login
     * Authenticates a user and returns their profile.
     */
    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Authenticate user" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ 
        status: 200, 
        description: "User successfully authenticated.",
        type: UserResponseDto 
    })
    @ApiResponse({ status: 401, description: "Unauthorized - Invalid credentials." })
    async login(@Body() body: LoginDto): Promise<UserResponseDto> {
        return this.authService.login(body);
    }
}