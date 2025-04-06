using Application.Exceptions;
using Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace WebAPI.Middlewares
{
    public class ExceptionMiddleware: IExceptionHandler
    {
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "Unhandled exception occurred.");

            context.Response.ContentType = "application/json";

            var (message, errorType, statusCode) = exception switch
            {
                ValidationException => (exception.Message, exception.GetType().Name, StatusCodes.Status400BadRequest),
                BadRequestException => (exception.Message, exception.GetType().Name, StatusCodes.Status400BadRequest),
                NotFoundException => (exception.Message, exception.GetType().Name, StatusCodes.Status404NotFound),
                ForbiddenException => (exception.Message, exception.GetType().Name, StatusCodes.Status403Forbidden),
                UnauthorizedException => (exception.Message, exception.GetType().Name, StatusCodes.Status401Unauthorized),
                _ => ("An unexpected error occurred.", "InternalServerError", StatusCodes.Status500InternalServerError)
            };

            context.Response.StatusCode = statusCode;

            var response = new
            {
                error = errorType,
                message
            };

            await context.Response.WriteAsJsonAsync(response, cancellationToken);
            return true;
        }
    }
}
