using Application.Exceptions;
using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetSimilarProducts
{
    public class GetSimilarProductsHandler : IRequestHandler<GetSimilarProductsQuery, GetSimilarProductsResult>
    {
        private readonly IProductService _productService;

        public GetSimilarProductsHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetSimilarProductsResult> Handle(GetSimilarProductsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var similarProducts = await _productService.GetSimilarProductsAsync(request.ProductId, request.Limit, cancellationToken);

                return GetSimilarProductsMapper.MapToGetSimilarProductsResult(similarProducts);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get silimar products", ex);
            }
        }
    }
}