using Application.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogHandler : IRequestHandler<GetProductCatalogQuery, GetProductCatalogResult>
    {
        private readonly IProductRepository _productRepository;

        public GetProductCatalogHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<GetProductCatalogResult> Handle(GetProductCatalogQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _productRepository.GetProductsQuery();

            var totalProducts = await productsQuery.CountAsync();

            var products = await productsQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            var pageCount = (int)Math.Ceiling(totalProducts / (double)request.PageSize);

            var result = GetProductCatalogMapper.MapToGetProductCatalogResult(products);

            result.PageCount = pageCount;
            result.PageSize = request.PageSize;
            result.Page = request.Page;

            return result;
        }
    }
}
