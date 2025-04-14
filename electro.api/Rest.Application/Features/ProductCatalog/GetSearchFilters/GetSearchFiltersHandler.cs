using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.ProductHierarchyAggregate;
using System.Linq.Expressions;
using Application.Exceptions;

namespace Rest.Application.Features.ProductCatalog.GetSearchFilters
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
            ValidateRequest(request);

            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Attributes)
                .Where(p => p.Status == ProductStatus.Active && p.StockQuantity > 0);

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

            var products = await productsQuery.ToListAsync(cancellationToken);

            var attributeValues = products
                .SelectMany(p => p.Attributes)
                .GroupBy(attr => attr.AttributeDefinitionId)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(attr => attr.Value.Trim())
                        .Distinct()
                        .ToList()
                );

            var attributeDefinitionIds = attributeValues.Keys.ToList();

            var attributeDefinitionsQuery = _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => attributeDefinitionIds.Contains(ad.Id) && ad.IsFilterable);

            Expression<Func<AttributeDefinition, bool>> hierarchyCondition = null;
            if (request.SubCategoryId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad, "SubCategoryId") == request.SubCategoryId.Value ||
                    EF.Property<int?>(ad, "CategoryId") == request.CategoryId.Value ||
                    EF.Property<int?>(ad, "GroupId") == request.GroupId.Value;
            }
            else if (request.CategoryId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad, "CategoryId") == request.CategoryId.Value ||
                    EF.Property<int?>(ad, "GroupId") == request.GroupId.Value;
            }
            else if (request.GroupId.HasValue)
            {
                hierarchyCondition = ad =>
                    EF.Property<int?>(ad, "GroupId") == request.GroupId.Value;
            }

            if (hierarchyCondition != null)
            {
                attributeDefinitionsQuery = attributeDefinitionsQuery.Where(hierarchyCondition).OrderBy(ad => ad.Name);
            }

            var attributeDefinitions = await attributeDefinitionsQuery.ToListAsync(cancellationToken);

            var filters = attributeDefinitions
                .Select(def => new GetSearchFiltersResultElement
                {
                    AttributeDefinitionId = def.Id,
                    Name = def.Name,
                    Type = def.Type,
                    Values = attributeValues.ContainsKey(def.Id) ? attributeValues[def.Id] : new List<string>()
                })
                .ToList();

            return new GetSearchFiltersResult
            {
                Filters = filters
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
