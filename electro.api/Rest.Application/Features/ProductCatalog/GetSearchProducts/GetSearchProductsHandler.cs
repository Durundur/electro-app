using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsHandler : IRequestHandler<GetSearchProductsQuery, GetSearchProductsResult>
    {
        private readonly IProductService _productService;

        public GetSearchProductsHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetSearchProductsResult> Handle(GetSearchProductsQuery request, CancellationToken cancellationToken)
        {
            var (products, totalProducts) = await _productService.GetSearchProductsAsync(
                request.Filters, request.GroupId, request.CategoryId, request.SubCategoryId, request.Page, request.PageSize, cancellationToken);

            return GetSearchProductsMapper.MapToGetSearchProductsResult(products, totalProducts, request.Page, request.PageSize);
        }
    }
}
