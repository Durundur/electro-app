using Rest.Application.Features.Shared.ProductAttribute;

namespace Rest.Application.Features.ProductCatalog.GetProduct
{
    public static class GetProductMapper
    {
        public static GetProductResult MapToGetProductResult(Domain.Aggregates.ProductCatalogAggregate.Product product)
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
                GroupId = product.Group.Id,
                CategoryId = product.Category.Id,
                SubCategoryId = product.SubCategory.Id,
                StockQuantity = product.StockQuantity,
                AverageOpinionRating = product.Opinions.Any() ? (float)Math.Round(product.Opinions.Average(o => o.Rating), 1) : 0,
                OpinionCount = product.Opinions.Count(),
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes),
                Promotion = product.Promotion?.IsValid() == true ? product.Promotion : null
            };
        }
    }
}
