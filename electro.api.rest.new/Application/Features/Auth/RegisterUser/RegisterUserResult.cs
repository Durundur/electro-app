namespace Application.Features.Auth.RegisterUser
{
    public abstract record RegisterUserResult(bool Success, string Message);

    public record RegisterUserSuccessResult(
        Guid UserProfileId,
        string Token,
        string RefreshToken,
        DateTime RefreshTokenExpiry,
        IList<string> Roles,
        string Message
    ) : RegisterUserResult(true, Message);

    public record RegisterUserErrorResult(string Message) : RegisterUserResult(false, Message);

}
