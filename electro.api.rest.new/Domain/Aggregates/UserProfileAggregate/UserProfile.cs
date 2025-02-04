namespace Domain.Aggregates.UserProfileAggregate
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public Guid UserIdentityId { get; set; }
    }
}
