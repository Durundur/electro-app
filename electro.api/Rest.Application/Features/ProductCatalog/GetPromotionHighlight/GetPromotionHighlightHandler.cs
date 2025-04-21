using Application.Exceptions;
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
            try
            {
                var product = await _productService.GetPromotionHighlightAsync(cancellationToken);

                return GetPromotionHighlightMapper.MapToGetPromotionHighlightResult(product);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get promotion highlight", ex);
            }
        }
    }
}