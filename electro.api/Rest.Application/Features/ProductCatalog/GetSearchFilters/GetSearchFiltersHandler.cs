using MediatR;
using Application.Exceptions;
using Application.Services.ProductService;

namespace Rest.Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersHandler : IRequestHandler<GetSearchFiltersQuery, GetSearchFiltersResult>
    {
        private readonly IProductService _productService;

        public GetSearchFiltersHandler(IProductService productService)
        {
             _productService = productService;
        }

        public async Task<GetSearchFiltersResult> Handle(GetSearchFiltersQuery request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);

            var filters = await _productService.GetSearchFiltersAsync(request.GroupId, request.CategoryId, request.SubCategoryId);

            return new GetSearchFiltersResult
            {
                Filters = filters.Select(f => new GetSearchFiltersResultElement
                {
                    AttributeDefinitionId = f.AttributeDefinitionId,
                    Name = f.Name,
                    Type = f.Type,
                    Values = f.Values,
                }).ToList(),
            };
        }

        private void ValidateRequest(GetSearchFiltersQuery request)
        {
            if (request.SubCategoryId.HasValue && !request.CategoryId.HasValue)
            {
                throw new BadRequestException("CategoryId is required when SubCategoryId is provided");
            }

            if (request.CategoryId.HasValue && !request.GroupId.HasValue)
            {
                throw new BadRequestException("GroupId is required when CategoryId is provided");
            }

            if (request.SubCategoryId.HasValue && !request.GroupId.HasValue)
            {
                throw new BadRequestException("GroupId is required when SubCategoryId is provided");
            }
        }
    }
}
