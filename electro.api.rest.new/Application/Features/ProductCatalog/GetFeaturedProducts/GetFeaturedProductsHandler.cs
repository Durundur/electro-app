using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetFeaturedProducts
{
    public class GetFeaturedProductsHandler : IRequestHandler<GetFeaturedProductsQuery, GetFeaturedProductsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetFeaturedProductsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetFeaturedProductsResult> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Opinions);

            var products = await productsQuery
                .Where(p => p.StockQuantity > 0)
                .OrderByDescending(p => p.Opinions.Any() ? p.Opinions.Average(o => o.Rating) : 0)
                .ThenByDescending(p => p.Opinions.Count())
                .Take(request.Limit)
                .ToListAsync(cancellationToken);

            return GetFeaturedProductsMapper.MapToGetFeaturedProductsResult(products);
        }
    }
}