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
            var bestPromotion = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Opinions)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .OrderByDescending(p => p.Opinions.Count())
                .FirstOrDefaultAsync(cancellationToken);

            return GetPromotionHighlightMapper.MapToGetPromotionHighlightResult(bestPromotion);
        }
    }
}