using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsHandler : IRequestHandler<GetSearchProductsQuery, GetSearchProductsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSearchProductsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetSearchProductsResult> Handle(GetSearchProductsQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery()
                .Include(p => p.Attributes.Where(a => a.IsPrimary))
                .Include(p => p.Opinions)
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

                    if (filter.Key == "search" && !string.IsNullOrEmpty(filter.Value.FirstOrDefault()))
                    {
                        var query = filter.Value.FirstOrDefault().ToLower();

                        productsQuery = productsQuery.Where(p =>
                            p.Name.ToLower().Contains(query) ||
                            (p.Description != null && p.Description.ToLower().Contains(query)) ||
                            p.Attributes.Any(a => a.Value.ToLower().Contains(query))
                        );
                        continue;
                    }

                    if (filter.Key == "sort")
                    {
                        switch (filter.Value.FirstOrDefault())
                        {
                            case "accuracy":
                                break;
                            case "price-asc":
                                productsQuery = productsQuery.OrderBy(p => p.Price.Amount);
                                break;
                            case "price-desc":
                                productsQuery = productsQuery.OrderByDescending(p => p.Price.Amount);
                                break;
                            default:
                                break;
                        }
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

            var attributeDefinitions = await _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => primaryAttributeDefinitionIds.Contains(ad.Id))
                .ToListAsync(cancellationToken);

            return GetSearchProductsMapper.MapToGetSearchProductsResult(products, attributeDefinitions, totalProducts, request.Page, request.PageSize);
        }
    }
}
