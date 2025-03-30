using Application.Features.Shared.ProductAttribute;

namespace Application.Features.ProductCatalog.GetProduct
{
    public static class GetProductMapper
    {
        public static GetProductResult MapToGetProductQueryResult(Domain.Aggregates.ProductCatalogAggregate.Product product, IEnumerable<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinitions)
        {
            return new GetProductResult
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photos = product.Photos.ToList(),
                Status = product.Status,
                CategoryId = product.CategoryId,
                GroupId = product.GroupId,
                SubCategoryId = product.SubCategoryId,
                StockQuantity = product.StockQuantity,
                AverageOpinionRating = product.Opinions.Any() ? (float)Math.Round(product.Opinions.Average(o => o.Rating), 1) : 0,
                OpinionCount = product.Opinions.Count(),
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes, attributeDefinitions)
            };
        }
    }
}
