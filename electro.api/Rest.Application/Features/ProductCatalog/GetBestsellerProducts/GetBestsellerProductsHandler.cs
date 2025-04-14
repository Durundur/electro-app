using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetBestsellerProducts
{
    public class GetBestsellerProductsHandler : IRequestHandler<GetBestsellerProductsQuery, GetBestsellerProductsResult>
    {
        private readonly IProductService _productService;

        public GetBestsellerProductsHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetBestsellerProductsResult> Handle(GetBestsellerProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _productService.GetBestsellerProductsAsync(request.Limit, cancellationToken);
            return GetBestsellerProductsMapper.MapToGetBestsellerProductsResult(products);
        }
    }
}