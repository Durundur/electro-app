namespace Domain.Aggregates.UserAggregate
{
    public interface IUser
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}
