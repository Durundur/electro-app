namespace electro.api.rest.Dtos.Auth
{
    public class RefreshTokenDto
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
