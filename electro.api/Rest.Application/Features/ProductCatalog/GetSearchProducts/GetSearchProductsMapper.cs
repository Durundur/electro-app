﻿using Rest.Application.Features.Shared.ProductAttribute;

namespace Rest.Application.Features.ProductCatalog.GetSearchProducts
{
    public static class GetSearchProductsMapper
    {
        public static GetSearchProductsResult MapToGetSearchProductsResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products, int totalCount, int page, int pageSize)
        {
            var mappedProducts = products
                .Select(p => MapToGetSearchProductsResultProduct(p))
                .ToList();

            return new GetSearchProductsResult(mappedProducts, totalCount, page, pageSize);
        }

        public static GetSearchProductsResultProduct MapToGetSearchProductsResultProduct(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetSearchProductsResultProduct()
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photo = product.MainPhoto,
                Status = product.Status,
                AverageOpinionRating = product.Opinions.Any() ? (float)Math.Round(product.Opinions.Average(o => o.Rating), 1) : 0,
                OpinionCount = product.Opinions.Count(),
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes.Where(a => a.IsPrimary)),
                Promotion = product?.Promotion?.IsCurrentlyActive == true ? product.Promotion.PromotionalPrice : null,
            };
        }
    }
}
