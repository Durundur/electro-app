using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetFeaturedProducts
{
    public class GetFeaturedProductsHandler : IRequestHandler<GetFeaturedProductsQuery, GetFeaturedProductsResult>
    {
        private readonly IProductService _productService;

        public GetFeaturedProductsHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetFeaturedProductsResult> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _productService.GetFeaturedProductsAsync(request.Limit, cancellationToken);
            return GetFeaturedProductsMapper.MapToGetFeaturedProductsResult(products);
        }
    }
}