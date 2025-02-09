namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class Opinion
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public string Content { get; private set; }
        public float Rating { get; private set; }
        public DateTime CreatedAt { get; private set; }
        private readonly List<OpinionAction> _actions;
        public IReadOnlyCollection<OpinionAction> Actions => _actions.AsReadOnly();
        public string AuthorDisplayName { get; set; }

        public Opinion() { }

        public Opinion(Guid userId, string content, float rating)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            Content = content;
            Rating = rating;
            CreatedAt = DateTime.UtcNow;
            _actions = new List<OpinionAction>();
        }

        public void AddAction(Guid userId, OpinionActionType actionType)
        {
            var existingAction = _actions.FirstOrDefault(a => a.UserId == userId);
            if (existingAction != null)
            {
                if (existingAction.ActionType == actionType)
                    return;

                _actions.Remove(existingAction);
            }

            var newAction = new OpinionAction(userId, actionType);
            _actions.Add(newAction);
        }

        public int GetLikesCount() => _actions.Count(a => a.ActionType == OpinionActionType.Like);
        public int GetDislikesCount() => _actions.Count(a => a.ActionType == OpinionActionType.Dislike);
    }
}
