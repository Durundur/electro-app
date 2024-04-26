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
    }
    
    public class RefreshTokenRequest
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
