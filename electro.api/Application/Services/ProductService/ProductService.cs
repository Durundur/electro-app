using Application.Exceptions;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Product>> GetFeaturedProductsAsync(int limit, CancellationToken cancellationToken)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Promotion)
                .Include(p => p.Opinions);

            var products = await productsQuery
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .OrderByDescending(p => p.Opinions.Any() ? p.Opinions.Average(o => o.Rating) : 0)
                .ThenByDescending(p => p.Opinions.Count())
                .Take(limit)
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<List<Product>> GetBestsellerProductsAsync(int limit, CancellationToken cancellationToken)
        {
            var bestsellers = await _unitOfWork.OrderRepository.GetOrdersQuery()
                .OrderByDescending(o => o.CreatedAt)
                .SelectMany(o => o.Products)
                .GroupBy(p => p.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    SoldCount = g.Count()
                })
                .OrderByDescending(x => x.SoldCount)
                .Take(limit)
                .ToListAsync(cancellationToken);

            var productIds = bestsellers.Select(b => b.ProductId).ToList();

            var products = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Promotion)
                .Where(p => productIds.Contains(p.Id))
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<List<Product>> GetSimilarProductsAsync(Guid productId, int limit, CancellationToken cancellationToken)
        {
            var sourceProduct = await _unitOfWork.ProductRepository.GetByIdAsync(productId, cancellationToken);
            if (sourceProduct == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found");
            }

            var sourceAttributes = sourceProduct.Attributes.ToList();

            var similarProductsQuery = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Promotion)
                .Include(p => p.Attributes)
                .Where(p => p.Id != productId)
                .Where(p => sourceProduct.GroupId.HasValue && p.GroupId == sourceProduct.GroupId)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .ToListAsync(cancellationToken);

            var productsWithScores = similarProductsQuery
                .Select(p => new
                {
                    Product = p,
                    SimilarityScore = CalculateSimilarityScore(sourceProduct, p, sourceAttributes)
                })
                .Where(x => x.SimilarityScore > 0)
                .OrderByDescending(x => x.SimilarityScore)
                .Take(limit)
                .Select(x => x.Product)
                .ToList();

            return productsWithScores;
        }

        private static decimal CalculateSimilarityScore(Product sourceProduct, Product candidateProduct, List<AttributeValue> sourceAttributes)
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

            var priceDifference = Math.Abs(1 - candidateProduct.Price.Amount / sourceProduct.Price.Amount);
            var priceScore = Math.Max(0, 1 - priceDifference);

            score += priceScore;

            return score;
        }
    }
}
