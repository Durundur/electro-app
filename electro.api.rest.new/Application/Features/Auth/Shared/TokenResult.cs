namespace Application.Features.Auth.Shared
{
    public class TokenResult
    {
        public Guid UserProfileId { get; set; }
        public IList<string> Roles { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}
