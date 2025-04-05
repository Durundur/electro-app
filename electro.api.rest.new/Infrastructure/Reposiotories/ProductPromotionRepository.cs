using Domain.Reposiotories;
using Domain.Aggregates.UserAggregate;
using Infrastructure.Context;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Infrastructure.Reposiotories
{
    public class ProductPromotionRepository : IProductPromotionRepository
    {
        protected readonly ApplicationDbContext _context;

        public ProductPromotionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductPromotion> AddProductPromotionAsync(ProductPromotion productPromotion, CancellationToken cancellationToken = default)
        {
            var entry = await _context.ProductPromotions.AddAsync(productPromotion, cancellationToken);
            return entry.Entity;
        }
    }
}
