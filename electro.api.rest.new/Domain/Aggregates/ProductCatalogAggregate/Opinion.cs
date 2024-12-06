namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class Opinion
    {
        public Guid Id { get; private set; }
        public Guid UserProfileId { get; private set; }
        public string Content { get; private set; }
        public float Rating { get; private set; }
        public DateTime CreatedAt { get; private set; }
        private readonly List<OpinionAction> _actions;
        public IReadOnlyCollection<OpinionAction> Actions => _actions.AsReadOnly();
        public string AuthorDisplayName { get; set; }

        public Opinion() { }

        public Opinion(Guid userProfileId, string content, float rating)
        {
            Id = Guid.NewGuid();
            UserProfileId = userProfileId;
            Content = content;
            Rating = rating;
            CreatedAt = DateTime.UtcNow;
            _actions = new List<OpinionAction>();
        }

        public void AddAction(Guid userProfileId, OpinionActionType actionType)
        {
            var existingAction = _actions.FirstOrDefault(a => a.UserProfileId == userProfileId);
            if (existingAction != null)
            {
                if (existingAction.ActionType == actionType)
                    return;

                _actions.Remove(existingAction);
            }

            var newAction = new OpinionAction(userProfileId, actionType);
            _actions.Add(newAction);
        }

        public int GetLikesCount() => _actions.Count(a => a.ActionType == OpinionActionType.Like);
        public int GetDislikesCount() => _actions.Count(a => a.ActionType == OpinionActionType.Dislike);
    }
}
