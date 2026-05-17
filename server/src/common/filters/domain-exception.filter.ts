import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserAlreadyExistsException } from '../../modules/auth/domain/exceptions/user-already-exists.exception';
import { InvalidCredentialsException } from '../../modules/auth/domain/exceptions/invalid-credentials.exception';
import { PasswordMismatchException } from '../../modules/auth/domain/exceptions/password-mismatch.exception';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception instanceof Error ? exception.message : 'Internal server error';
        const errorName = exception instanceof Error ? exception.name : 'Error';

        const constructorName = exception && typeof exception === 'object' && 'constructor' in exception
            ? (exception as { constructor: { name?: string } }).constructor?.name
            : undefined;

        if (exception instanceof UserAlreadyExistsException || constructorName === 'UserAlreadyExistsException') {
            status = HttpStatus.CONFLICT;
            message = 'User already exists';
        } else if (exception instanceof InvalidCredentialsException || constructorName === 'InvalidCredentialsException') {
            status = HttpStatus.UNAUTHORIZED;
            message = 'Invalid email or password';
        } else if (exception instanceof PasswordMismatchException || constructorName === 'PasswordMismatchException') {
            status = HttpStatus.BAD_REQUEST;
            message = 'Passwords do not match';
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse();
            if (typeof responseData === 'object' && responseData !== null) {
                const body = responseData as Record<string, unknown>;
                message = typeof body.message === 'string'
                    ? body.message
                    : Array.isArray(body.message)
                    ? body.message.join(', ')
                    : 'Http Exception';
            } else {
                message = String(responseData);
            }
        }

        response.status(status).json({
            statusCode: status,
            message: message,
            error: errorName,
        });
    }
}
