using MediatR;
using Application.Services.ProductService;
using Application.Services.Models;
using Application.Exceptions;

namespace Rest.Application.Features.ProductCatalog.CreateOrUpdateProduct
{
    public class CreateOrUpdateProductHandler : IRequestHandler<CreateOrUpdateProductCommand, CreateOrUpdateProductResult>
    {
        private readonly IProductService _productService;

        public CreateOrUpdateProductHandler(IProductService productService)
        {
            _productService = productService;
        }
        public async Task<CreateOrUpdateProductResult> Handle(CreateOrUpdateProductCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var model = new ProductModel
                {
                    Id = command.Id,
                    Name = command.Name,
                    Description = command.Description,
                    Amount = command.Amount,
                    Currency = command.Currency,
                    Photos = command.Photos,
                    StockQuantityDelta = command.StockQuantityDelta,
                    Status = command.Status,
                    GroupId = command.GroupId,
                    CategoryId = command.CategoryId,
                    SubCategoryId = command.SubCategoryId,
                    Attributes = command.Attributes.Select(a => new ProductAttributeModel
                    {
                        Id = a.Id,
                        Value = a.Value,
                        IsPrimary = a.IsPrimary
                    }).ToList(),
                    Promotion = command.Promotion == null ? null : new ProductPromotionModel
                    {
                        PromotionAmount = command.Promotion.PromotionAmount,
                        PromotionCurrency = command.Promotion.PromotionCurrency,
                        StartDate = command.Promotion.StartDate,
                        EndDate = command.Promotion.EndDate,
                        IsActive = command.Promotion.IsActive
                    }
                };

                var resultProduct = await _productService.CreateOrUpdateProductAsync(model, cancellationToken);

                return CreateOrUpdateProductMapper.MapToCreateOrUpdateProductResult(resultProduct);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update product", ex);
            }
        }
    }
}
