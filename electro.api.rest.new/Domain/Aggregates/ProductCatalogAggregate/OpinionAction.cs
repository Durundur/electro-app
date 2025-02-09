namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class OpinionAction
    {
        public Guid UserId { get; private set; }
        public OpinionActionType ActionType { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public OpinionAction() { }

        public OpinionAction(Guid userId, OpinionActionType actionType)
        {
            UserId = userId;
            ActionType = actionType;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
