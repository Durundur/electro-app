namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class OpinionAction
    {
        public Guid UserProfileId { get; private set; }
        public OpinionActionType ActionType { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public OpinionAction() { }

        public OpinionAction(Guid userProfileId, OpinionActionType actionType)
        {
            UserProfileId = userProfileId;
            ActionType = actionType;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
