﻿using Application.Features.Shared.ProductAttribute;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public class CreateOrUpdateProductResult
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
        public IList<ProductAttributeResult> Attributes { get; set; }
    }
}
