namespace Application.Services.UserContext
{
    public interface IUserContext
    {
        Guid UserId { get; }
        string Email { get; }
        bool IsAdmin { get; }
        bool IsAuthenticated { get; }
    }
}
