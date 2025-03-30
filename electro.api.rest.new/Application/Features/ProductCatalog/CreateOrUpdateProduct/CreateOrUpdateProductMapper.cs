using Application.Features.Shared.ProductAttribute;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public static class CreateOrUpdateProductMapper
    {
        public static CreateOrUpdateProductResult MapToCreateOrUpdateProductResult(Domain.Aggregates.ProductCatalogAggregate.Product product, IEnumerable<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinitions)
        {
            return new CreateOrUpdateProductResult()
            {
                Id = product.Id,
                Name = product.Name,
                GroupId = product.GroupId,
                CategoryId = product.CategoryId,
                SubCategoryId = product.SubCategoryId,
                Description = product.Description,
                Photos = product.Photos.ToList(),
                Status = product.Status,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes, attributeDefinitions)
            };
        }
    }
}
