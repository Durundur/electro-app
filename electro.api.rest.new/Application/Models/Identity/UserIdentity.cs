namespace Application.Models.Identity
{
    public class UserIdentity
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}
