using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Rest.Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogHandler : IRequestHandler<GetProductCatalogQuery, GetProductCatalogResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductCatalogHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetProductCatalogResult> Handle(GetProductCatalogQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery().OrderBy(p => p.Name);

            var totalProducts = await productsQuery.CountAsync();

            var products = await productsQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return new GetProductCatalogResult(
                GetProductCatalogMapper.MapToGetProductCatalogResultProducts(products).ToList(),
                totalProducts,
                request.Page,
                request.PageSize
            );
        }
    }
}
