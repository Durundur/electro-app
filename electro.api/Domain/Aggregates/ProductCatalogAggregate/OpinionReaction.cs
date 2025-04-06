namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class OpinionReaction
    {
        public Guid OpinionId { get; private set; }
        public Guid UserId { get; private set; }
        public OpinionReactionType Reaction { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private OpinionReaction() { }

        public static OpinionReaction Create(Guid opinionId, Guid userId, OpinionReactionType reaction)
        {
            return new OpinionReaction
            {   
                OpinionId = opinionId,
                UserId = userId,
                Reaction = reaction,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
