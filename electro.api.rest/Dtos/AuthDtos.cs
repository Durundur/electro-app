namespace electro.api.rest.Dtos
{
    public class AuthRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class AuthResponseDto
    {
        public string? JwtToken { get; set; }
        public string? RefreshToken { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public string? UserId { get; set; }
        public DateTime? TokenExpiry { get; set; }
        public IList<string>? Roles { get; set; } = new List<string>();

    }
    
    public class RefreshTokenRequest
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
