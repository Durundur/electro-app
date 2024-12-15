using Application.Reposiotories;
using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsHandler : IRequestHandler<GetSearchProductsQuery, GetSearchProductsResult>
    {
        private readonly IProductRepository _productRepository;
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public GetSearchProductsHandler(IProductRepository productRepository, IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _productRepository = productRepository;
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }

        public async Task<GetSearchProductsResult> Handle(GetSearchProductsQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _productRepository.GetProductsQuery().Include(p => p.Attributes.Where(a => a.IsPrimary)).AsQueryable();

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

            if (request.Filters != null && request.Filters.Any())
            {
                foreach (var filter in request.Filters)
                {

                    if (filter.Key == "from" && decimal.TryParse(filter.Value.FirstOrDefault(), out var priceFrom))
                    {
                        productsQuery = productsQuery.Where(p => p.Price.Amount >= priceFrom);
                        continue;
                    }

                    if (filter.Key == "to" && decimal.TryParse(filter.Value.FirstOrDefault(), out var priceTo))
                    {
                        productsQuery = productsQuery.Where(p => p.Price.Amount <= priceTo);
                        continue;
                    }

                    if (!Guid.TryParse(filter.Key, out Guid attributeDefId)) continue;
                    var attributeValues = filter.Value;

                    productsQuery = productsQuery.Where(p => p.Attributes.Any(a => a.AttributeDefinitionId == attributeDefId && attributeValues.Contains(a.Value)));
                }
            }

            var totalProducts = await productsQuery.CountAsync(cancellationToken);

            var products = await productsQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            var primaryAttributeDefinitionIds = products
                .SelectMany(p => p.Attributes)
                .Where(a => a.IsPrimary)
                .Select(a => a.AttributeDefinitionId)
                .Distinct()
                .ToList();

            var attributeDefinitions = await _attributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => primaryAttributeDefinitionIds.Contains(ad.Id))
                .ToListAsync();

            var result = GetSearchProductsMapper.MapToGetSearchProductsResult(products, attributeDefinitions);

            result.PageCount = (int)Math.Ceiling(totalProducts / (double)request.PageSize);
            result.PageSize = request.PageSize;
            result.Page = request.Page;

            return result;
        }
    }
}
