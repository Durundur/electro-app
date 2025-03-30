using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetBestsellerProducts
{
    public class GetBestsellerProductsHandler : IRequestHandler<GetBestsellerProductsQuery, GetBestsellerProductsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetBestsellerProductsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetBestsellerProductsResult> Handle(GetBestsellerProductsQuery request, CancellationToken cancellationToken)
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
                .Take(request.Limit)
                .ToListAsync(cancellationToken);

            var productIds = bestsellers.Select(b => b.ProductId).ToList();

            var products = await _unitOfWork.ProductRepository.GetProductsQuery()
                .Where(p => productIds.Contains(p.Id))
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .ToListAsync(cancellationToken);

            return GetBestsellerProductsMapper.MapToGetBestsellerProductsResult(products);
        }
    }
}