using Rest.Application.Features.Shared.ProductAttribute;

namespace Rest.Application.Features.ProductCatalog.CreateOrUpdateProduct
{
    public static class CreateOrUpdateProductMapper
    {
        public static CreateOrUpdateProductResult MapToCreateOrUpdateProductResult(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new CreateOrUpdateProductResult()
            {
                Id = product.Id,
                Name = product.Name,
                GroupId = product.Group.Id,
                CategoryId = product.Category.Id,
                SubCategoryId = product.SubCategory.Id,
                Description = product.Description,
                Photos = product.Photos.ToList(),
                Status = product.Status,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes)
            };
        }
    }
}
