namespace electro.api.rest.Dtos.Auth
{
    public class AuthDto
    {
        public string? JwtToken { get; set; }
        public string? RefreshToken { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public string? UserId { get; set; }
        public DateTime? TokenExpiry { get; set; }
        public IList<string>? Roles { get; set; } = new List<string>();
    }
}
