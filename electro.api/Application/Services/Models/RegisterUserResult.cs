﻿namespace Application.Services.Models
{
    public abstract record RegisterUserResult(bool Success, string Message);

    public record RegisterUserSuccessResult(
        Guid UserId,
        string Token,
        DateTime TokenExpiry,
        string RefreshToken,
        DateTime RefreshTokenExpiry,
        IList<string> Roles,
        string Message
    ) : RegisterUserResult(true, Message);

    public record RegisterUserErrorResult(string Message) : RegisterUserResult(false, Message);
}