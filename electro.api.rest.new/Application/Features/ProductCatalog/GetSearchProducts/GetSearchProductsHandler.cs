﻿using Application.Reposiotories;
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

            var totalProducts = await productsQuery.CountAsync();

            var products = await productsQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

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