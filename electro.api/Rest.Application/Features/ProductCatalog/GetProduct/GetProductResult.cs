﻿using Domain.Aggregates.ProductCatalogAggregate;
using Rest.Application.Features.Shared.ProductAttribute;

namespace Rest.Application.Features.ProductCatalog.GetProduct
{
    public class GetProductResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public IList<string> Photos { get; set; }
        public ProductStatus Status { get; set; }
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public int StockQuantity { get; set; }
        public float AverageOpinionRating { get; set; }
        public int OpinionCount { get; set; }
        public IList<ProductAttributeResult> Attributes { get; set; }
        public ProductPromotion? Promotion { get; set; }
    }
}
