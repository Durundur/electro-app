using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogHandler : IRequestHandler<GetProductCatalogQuery, GetProductCatalogResult>
    {
        private readonly IProductService _productService;

        public GetProductCatalogHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetProductCatalogResult> Handle(GetProductCatalogQuery request, CancellationToken cancellationToken)
        {
            var (products, totalProducts) = await _productService.GetProductCatalogAsync(request.Page, request.PageSize, cancellationToken);

            return new GetProductCatalogResult(
                GetProductCatalogMapper.MapToGetProductCatalogResultProducts(products).ToList(),
                totalProducts,
                request.Page,
                request.PageSize
            );
        }
    }
}
