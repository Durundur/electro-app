namespace Domain.Aggregates.UserProfileAggregate
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public Guid UserIdentityId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
