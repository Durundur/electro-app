using Application.Exceptions;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetSimilarProducts
{
    public class GetSimilarProductsHandler : IRequestHandler<GetSimilarProductsQuery, GetSimilarProductsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSimilarProductsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetSimilarProductsResult> Handle(GetSimilarProductsQuery request, CancellationToken cancellationToken)
        {
            var sourceProduct = await _unitOfWork.ProductRepository.GetByIdAsync(request.ProductId, cancellationToken);
            if (sourceProduct == null)
            {
                throw new NotFoundException($"Product with ID {request.ProductId} not found");
            }

            var sourceAttributes = sourceProduct.Attributes.ToList();

            var similarProductsQuery = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Attributes)
                .Where(p => p.Id != request.ProductId)
                .Where(p => sourceProduct.GroupId.HasValue && p.GroupId == sourceProduct.GroupId)
                .ToListAsync(cancellationToken);

            var productsWithScores = similarProductsQuery
                .Select(p => new
                {
                    Product = p,
                    SimilarityScore = CalculateSimilarityScore(sourceProduct, p, sourceAttributes)
                })
                .Where(x => x.SimilarityScore > 0)
                .OrderByDescending(x => x.SimilarityScore)
                .Take(request.Limit)
                .Select(x => x.Product)
                .ToList();

            return GetSimilarProductsMapper.MapToGetSimilarProductsResult(productsWithScores);
        }

        private decimal CalculateSimilarityScore(
            Domain.Aggregates.ProductCatalogAggregate.Product sourceProduct,
            Domain.Aggregates.ProductCatalogAggregate.Product candidateProduct,
            List<AttributeValue> sourceAttributes)
        {
            decimal score = 0;

            if (sourceProduct.GroupId.HasValue && candidateProduct.GroupId == sourceProduct.GroupId)
                score += 1m;
            if (sourceProduct.CategoryId.HasValue && candidateProduct.CategoryId == sourceProduct.CategoryId)
                score += 1m;
            if (sourceProduct.SubCategoryId.HasValue && candidateProduct.SubCategoryId == sourceProduct.SubCategoryId)
                score += 1m;

            var primarySourceAttributes = sourceAttributes.Where(a => a.IsPrimary).ToList();
            var primaryCandidateAttributes = candidateProduct.Attributes.Where(a => a.IsPrimary).ToList();

            var commonPrimaryAttributesCount = primaryCandidateAttributes.Count(a =>
                primarySourceAttributes.Any(sa =>
                    sa.AttributeDefinitionId == a.AttributeDefinitionId &&
                    sa.Value == a.Value
                ));

            score += commonPrimaryAttributesCount * 0.5m;

            var secondarySourceAttributes = sourceAttributes.Where(a => !a.IsPrimary).ToList();
            var secondaryCandidateAttributes = candidateProduct.Attributes.Where(a => !a.IsPrimary).ToList();

            var commonSecondaryAttributesCount = secondaryCandidateAttributes.Count(a =>
                secondarySourceAttributes.Any(sa =>
                    sa.AttributeDefinitionId == a.AttributeDefinitionId &&
                    sa.Value == a.Value
                ));

            score += commonSecondaryAttributesCount * 0.2m;

            var priceDifference = Math.Abs(1 - (candidateProduct.Price.Amount / sourceProduct.Price.Amount));
            var priceScore = Math.Max(0, 1 - priceDifference);

            score += priceScore;

            return score;
        }
    }
}