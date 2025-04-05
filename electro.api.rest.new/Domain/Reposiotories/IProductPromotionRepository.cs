using Domain.Aggregates.ProductCatalogAggregate;

namespace Domain.Reposiotories
{
    public interface IProductPromotionRepository
    {
        Task<ProductPromotion> AddProductPromotionAsync(ProductPromotion productPromotion, CancellationToken cancellationToken = default);
    }
}
