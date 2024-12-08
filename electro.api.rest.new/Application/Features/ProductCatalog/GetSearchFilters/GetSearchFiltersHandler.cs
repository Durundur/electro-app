using Application.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersHandler : IRequestHandler<GetSearchFiltersQuery, GetSearchFiltersResult>
    {
        private readonly IProductRepository _productRepository;
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public GetSearchFiltersHandler(IProductRepository productRepository, IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _productRepository = productRepository;
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }

        public async Task<GetSearchFiltersResult> Handle(GetSearchFiltersQuery request, CancellationToken cancellationToken)
        {

            var productsQuery = _productRepository.GetProductsQuery().Include(p => p.Attributes).AsQueryable();

            if (request.GroupId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.GroupId == request.GroupId.Value);
            }

            if (request.CategoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.CategoryId == request.CategoryId.Value);
            }

            if (request.SubCategoryId.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.SubCategoryId == request.SubCategoryId.Value);
            }

            var attributeValues = productsQuery
                .SelectMany(p => p.Attributes)
                .GroupBy(attr => attr.AttributeDefinitionId)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(attr => attr.Value.Trim()).Distinct().ToList()
                );

            var attributeDefinitionIds = attributeValues.Keys.ToList();
            var attributeDefinitions = await _attributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => attributeDefinitionIds.Contains(ad.Id) && ad.IsFilterable)
                .ToListAsync(cancellationToken);

            var filters = attributeDefinitions.Select(def => new GetSearchFiltersResultElement
            {
                AttributeDefinitionId = def.Id,
                Name = def.Name,
                Type = def.Type,
                Values = attributeValues.ContainsKey(def.Id) ? attributeValues[def.Id] : new List<string>()
            }).ToList();

            return new GetSearchFiltersResult()
            {
                Filters = filters
            };
        }
    }
}
