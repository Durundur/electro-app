namespace Application.Features.Auth.LoginUser
{
    public abstract record LoginUserResult(bool Success, string Message);

    public record LoginUserSuccessResult(
        Guid UserProfileId,
        string Token,
        string RefreshToken,
        DateTime RefreshTokenExpiry,
        IList<string> Roles,
        string Message
    ) : LoginUserResult(true, Message);

    public record LoginUserErrorResult(string Message) : LoginUserResult(false, Message);
}
