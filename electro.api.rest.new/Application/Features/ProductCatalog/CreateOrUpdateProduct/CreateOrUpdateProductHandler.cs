using Domain.Reposiotories;
using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Exceptions;
using Microsoft.Extensions.Logging;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public class CreateOrUpdateProductHandler : IRequestHandler<CreateOrUpdateProductCommand, CreateOrUpdateProductResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<CreateOrUpdateProductHandler> _logger;

        public CreateOrUpdateProductHandler(IUnitOfWork unitOfWork, ILogger<CreateOrUpdateProductHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        public async Task<CreateOrUpdateProductResult> Handle(CreateOrUpdateProductCommand command, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync(cancellationToken: cancellationToken);

                Product product;

                if (command.Id.HasValue)
                {
                    product = await _unitOfWork.ProductRepository.GetByIdWithLockAsync(command.Id.Value);

                    if (product == null)
                    {
                        throw new NotFoundException(nameof(Product), command.Id.Value);
                    }

                    var price = new Domain.ValueObjects.Money(command.Amount, command.Currency);
                    product.Update(command.Name, command.Description, price, command.Status, product.StockQuantity + command.StockQuantityDelta);
                }
                else
                {
                    var price = new Domain.ValueObjects.Money(command.Amount, command.Currency);
                    product = Product.Create(command.Name, command.Description, price, command.StockQuantityDelta);

                    await _unitOfWork.ProductRepository.AddProductAsync(product, cancellationToken);
                }

                product.UpdatePhotos(command.Photos);

                product.AssignToGroup(command.GroupId);
                product.AssignToCategory(command.CategoryId);
                product.AssignToSubCategory(command.SubCategoryId);

                if (command.Promotion == null)
                {
                    if (product.Promotion != null)
                    {
                        product.RemovePromotion();
                    }
                }
                else
                {
                    var promotionalPrice = new Domain.ValueObjects.Money(command.Promotion.PromotionAmount, command.Promotion.PromotionCurrency);

                    if (product.Promotion == null)
                    {
                        product.CreatePromotion(
                            promotionalPrice,
                            command.Promotion.StartDate,
                            command.Promotion.EndDate,
                            command.Promotion.IsActive
                        );
                        await _unitOfWork.ProductPromotionRepository.AddProductPromotionAsync(product.Promotion, cancellationToken);
                    }
                    else
                    {
                        product.UpdatePromotion(
                            promotionalPrice,
                            command.Promotion.StartDate,
                            command.Promotion.EndDate,
                            command.Promotion.IsActive
                        );
                    }
                }

                if (command.Attributes != null && command.Attributes.Any())
                {
                    var attributeValues = command.Attributes.Select(a => new AttributeValue(a.Id, a.Value, a.IsPrimary));
                    product.UpdateAttributes(attributeValues);
                }

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync(cancellationToken);

                var savedProduct = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id, cancellationToken);

                var attributeDefinitions = await _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
                    .Where(ad => savedProduct.Attributes.Select(a => a.AttributeDefinitionId).Contains(ad.Id))
                    .ToListAsync(cancellationToken: cancellationToken);

                return CreateOrUpdateProductMapper.MapToCreateOrUpdateProductResult(savedProduct, attributeDefinitions);

            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                _logger.LogError(ex, "An error occurred while creating or updating product");
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
