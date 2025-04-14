namespace Rest.Application.Features.Auth.LoginUser
{
    public abstract record LoginUserResult(bool Success, string Message);

    public record LoginUserSuccessResult(
        Guid UserId,
        string Token,
        DateTime TokenExpiry,
        string RefreshToken,
        DateTime RefreshTokenExpiry,
        IList<string> Roles,
        string Message
    ) : LoginUserResult(true, Message);

    public record LoginUserErrorResult(string Message)
        : LoginUserResult(false, Message);
}