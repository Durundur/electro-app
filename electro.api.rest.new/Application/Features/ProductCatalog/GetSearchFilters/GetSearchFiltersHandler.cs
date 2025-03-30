using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersHandler : IRequestHandler<GetSearchFiltersQuery, GetSearchFiltersResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSearchFiltersHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetSearchFiltersResult> Handle(GetSearchFiltersQuery request, CancellationToken cancellationToken)
        {

            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Attributes)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0)
                .AsQueryable();

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
            var attributeDefinitions = await _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
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
