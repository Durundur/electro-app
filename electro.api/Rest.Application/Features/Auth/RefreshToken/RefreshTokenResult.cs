namespace Rest.Application.Features.Auth.RefreshToken
{
    public abstract record RefreshTokenResult(bool Success, string Message);

    public record RefreshTokenSuccessResult(
        Guid UserId,
        string Token,
        DateTime TokenExpiry,
        string RefreshToken,
        DateTime RefreshTokenExpiry,
        IList<string> Roles,
        string Message
    ) : RefreshTokenResult(true, Message);

    public record RefreshTokenErrorResult(string Message) : RefreshTokenResult(false, Message);
}

