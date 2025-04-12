using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetPromotionHighlight
{
    public class GetPromotionHighlightHandler : IRequestHandler<GetPromotionHighlightQuery, GetPromotionHighlightResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetPromotionHighlightHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetPromotionHighlightResult> Handle(GetPromotionHighlightQuery request, CancellationToken cancellationToken)
        {
            var now = DateTime.UtcNow;

            var bestPromotion = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Promotion)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .Where(p => p.Promotion != null && p.Promotion.IsActive &&  p.Promotion.StartDate <= now && p.Promotion.EndDate >= now)
                .OrderByDescending(p => (p.Price.Amount - p.Promotion.PromotionalPrice.Amount) / p.Price.Amount)
                .FirstOrDefaultAsync(cancellationToken);

            return GetPromotionHighlightMapper.MapToGetPromotionHighlightResult(bestPromotion);
        }
    }
}