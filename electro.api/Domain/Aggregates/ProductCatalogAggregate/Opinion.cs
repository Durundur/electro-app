using Domain.Exceptions;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class Opinion
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public string Content { get; private set; }
        public float Rating { get; private set; }
        public DateTime CreatedAt { get; private set; }
        private readonly List<OpinionReaction> _reactions = new List<OpinionReaction>();
        public IReadOnlyCollection<OpinionReaction> Reactions => _reactions.AsReadOnly();
        public string AuthorDisplayName { get; private set; }
        public int GetLikesCount() => _reactions.Count(a => a.Reaction == OpinionReactionType.Like);
        public int GetDislikesCount() => _reactions.Count(a => a.Reaction == OpinionReactionType.Dislike);

        private Opinion() { }

        public static Opinion Create(Guid userId, string content, float rating, string authorDisplayName)
        {
            ValidateUserId(userId);
            ValidateContent(content);
            ValidateRating(rating);
            ValidateAuthorDisplayName(authorDisplayName);

            return new Opinion
            {
                UserId = userId,
                Content = content,
                Rating = rating,
                AuthorDisplayName = authorDisplayName,
                CreatedAt = DateTime.UtcNow
            };
        }

        public OpinionReaction AddReaction(Guid userId, OpinionReactionType reactionType)
        {
            var existingReaction = _reactions.FirstOrDefault(r => r.UserId == userId);
            if (existingReaction != null)
            {
                if (existingReaction.Reaction == reactionType)
                {
                    _reactions.Remove(existingReaction);
                    return existingReaction;
                }

                _reactions.Remove(existingReaction);
            }

            var reaction = OpinionReaction.Create(this.Id, userId, reactionType);

            _reactions.Add(reaction);

            return reaction;
        }

        public OpinionReactionType? GetUserReaction(Guid userId)
        {
            var reaction = _reactions.FirstOrDefault(r => r.UserId == userId);
            return reaction?.Reaction ?? null;
        }

        private static void ValidateUserId(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new DomainException("User ID cannot be empty.");
            }
        }

        private static void ValidateContent(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                throw new DomainException("Opinion content cannot be empty.");
            }

            if (content.Length > 1000)
            {
                throw new DomainException("Opinion content cannot exceed 1000 characters.");
            }
        }

        private static void ValidateRating(float rating)
        {
            if (rating < 0 || rating > 5)
            {
                throw new DomainException("Rating must be between 1 and 5.");
            }
        }

        private static void ValidateAuthorDisplayName(string authorDisplayName)
        {
            if (string.IsNullOrWhiteSpace(authorDisplayName))
            {
                throw new DomainException("Author display name cannot be empty.");
            }

            if (authorDisplayName.Length > 100)
            {
                throw new DomainException("Author display name cannot exceed 100 characters.");
            }
        }
    }
}
