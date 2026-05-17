import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserAlreadyExistsException } from '../../modules/auth/domain/exceptions/user-already-exists.exception';
import { InvalidCredentialsException } from '../../modules/auth/domain/exceptions/invalid-credentials.exception';
import { PasswordMismatchException } from '../../modules/auth/domain/exceptions/password-mismatch.exception';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message || 'Internal server error';

        if (exception instanceof UserAlreadyExistsException || exception.constructor?.name === 'UserAlreadyExistsException') {
            status = HttpStatus.CONFLICT;
            message = 'User already exists';
        } else if (exception instanceof InvalidCredentialsException || exception.constructor?.name === 'InvalidCredentialsException') {
            status = HttpStatus.UNAUTHORIZED;
            message = 'Invalid email or password';
        } else if (exception instanceof PasswordMismatchException || exception.constructor?.name === 'PasswordMismatchException') {
            status = HttpStatus.BAD_REQUEST;
            message = 'Passwords do not match';
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse() as any;
            message = responseData.message || responseData;
        }

        response.status(status).json({
            statusCode: status,
            message: message,
            error: exception.name || 'Error',
        });
    }
}
