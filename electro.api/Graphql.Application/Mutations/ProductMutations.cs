using Application.Exceptions;
using Application.Services.Models;
using Application.Services.ProductService;
using Domain.Aggregates.ProductCatalogAggregate;
using Graphql.Application.Mutations.Inputs;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        [Authorize(Roles = ["Admin"])]
        public async Task<Product> CreateOrUpdateProduct([Service] IProductService productService, CreateOrUpdateProductInput input,  CancellationToken cancellationToken)
        {
            try
            {
                var model = new ProductModel
                {
                    Id = input.Id,
                    Name = input.Name,
                    Description = input.Description,
                    Amount = input.Amount,
                    Currency = input.Currency,
                    Photos = input.Photos,
                    StockQuantityDelta = input.StockQuantityDelta,
                    Status = input.Status,
                    GroupId = input.GroupId,
                    CategoryId = input.CategoryId,
                    SubCategoryId = input.SubCategoryId,
                    Attributes = input.Attributes.Select(a => new ProductAttributeModel
                    {
                        Id = a.Id,
                        Value = a.Value,
                        IsPrimary = a.IsPrimary
                    }).ToList(),
                    Promotion = input.Promotion == null ? null : new ProductPromotionModel
                    {
                        PromotionAmount = input.Promotion.PromotionAmount,
                        PromotionCurrency = input.Promotion.PromotionCurrency,
                        StartDate = input.Promotion.StartDate,
                        EndDate = input.Promotion.EndDate,
                        IsActive = input.Promotion.IsActive
                    }
                };

                var resultProduct = await productService.CreateOrUpdateProductAsync(model, cancellationToken);

                return resultProduct;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update product", ex);
            }
        }
    }
}
