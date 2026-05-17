export type AuthMode = "login" | "signup"

export interface User {
    id: string
    email: string
    role: string
    firstName: string
    lastName: string
}

export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface RegisterResponse {
    message: string
    otp: string
    user: User
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    message: string
    accessToken: string
    user: User
}

export interface VerifyOtpRequest {
    email: string
    otp: string
}

export interface VerifyOtpResponse {
    id: string
    email: string
    role: string
    firstName: string
    lastName: string
    isVerified: boolean
}
