using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetPromotionHighlight
{
    public class GetPromotionHighlightHandler : IRequestHandler<GetPromotionHighlightQuery, GetPromotionHighlightResult>
    {
        private readonly IProductService _productService;

        public GetPromotionHighlightHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetPromotionHighlightResult> Handle(GetPromotionHighlightQuery request, CancellationToken cancellationToken)
        {
            var product = await _productService.GetPromotionHighlightAsync(cancellationToken);

            return GetPromotionHighlightMapper.MapToGetPromotionHighlightResult(product);
        }
    }
}