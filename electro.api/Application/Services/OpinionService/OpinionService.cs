using Application.Exceptions;
using Application.Services.Models;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.OpinionService
{
    public class OpinionService : IOpinionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OpinionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Opinion> CreateOpinionAsync(Guid userId, OpinionModel opinion, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(opinion.ProductId, cancellationToken);

            if (product == null)
            {
                throw new NotFoundException($"Product with Id '{opinion.ProductId}' was not found.");
            }

            var newOpinion = product.AddOpinion(userId, opinion.Content.Trim(), opinion.Rating, opinion.AuthorDisplayName);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return newOpinion;
        }

        public async Task<Opinion> CreateOpinionReactionAsync(Guid userId, Guid opinionId, OpinionReactionType reactionType, CancellationToken cancellationToken)
        {
            var opinion = await _unitOfWork.OpinionRepository.GetByIdAsync(opinionId, cancellationToken);

            if (opinion == null)
            {
                throw new NotFoundException($"Opinion with Id '{opinionId}' was not found.");
            }

            var reaction = opinion.AddReaction(userId, reactionType);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return opinion;
        }

        public async Task<Opinion> GetOpinionByIdAsync(Guid opinionId, CancellationToken cancellationToken)
        {
            var opinion = await _unitOfWork.OpinionRepository.GetByIdAsync(opinionId, cancellationToken);

            if (opinion == null)
            {
                throw new NotFoundException($"Opinion with Id '{opinionId}' was not found.");
            }

            return opinion;
        }

        public async Task<(List<Opinion>, int totalOpinions)> GetProductOpinionsAsync(Guid productId, int page, int pageSize, int? rating, CancellationToken cancellationToken)
        {
            var productOpinionsQuery = _unitOfWork.OpinionRepository.GetOpinionsQuery().Where(o => EF.Property<Guid>(o, "ProductId") == productId);

            if (rating.HasValue)
            {
                productOpinionsQuery = productOpinionsQuery.Where(o => (int)Math.Ceiling(o.Rating) == rating.Value);
            }

            var totalOpinions = await productOpinionsQuery.CountAsync(cancellationToken);

            productOpinionsQuery = productOpinionsQuery
                   .OrderByDescending(o => o.CreatedAt)
                   .Skip((page - 1) * pageSize)
                   .Take(pageSize);

            var opinions = await productOpinionsQuery.ToListAsync(cancellationToken);

            return (opinions,  totalOpinions);
        }

        public async Task<List<OpinionsStats>> GetProductOpinionsStatsAsync(Guid productId, CancellationToken cancellationToken)
        {
            var stats = await _unitOfWork.OpinionRepository.GetOpinionsQuery()
                .Where(o => EF.Property<Guid>(o, "ProductId") == productId)
                .GroupBy(o => (int)Math.Ceiling(o.Rating))
                .Select(g => new OpinionsStats
                {
                    Rating = g.Key,
                    Count = g.Count()
                })
                .ToListAsync(cancellationToken);

            var allRatings = Enumerable.Range(1, 5);
            var existingRatings = stats.Select(s => s.Rating);
            var missingRatings = allRatings.Except(existingRatings);

            stats.AddRange(missingRatings.Select(r => new OpinionsStats
            {
                Rating = r,
                Count = 0
            }));

            return stats.OrderBy(s => s.Rating).ToList();
        }
    }
}
