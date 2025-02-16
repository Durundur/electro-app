using Domain.Reposiotories;
using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Exceptions;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public class CreateOrUpdateProductHandler : IRequestHandler<CreateOrUpdateProductCommand, CreateOrUpdateProductResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrUpdateProductHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<CreateOrUpdateProductResult> Handle(CreateOrUpdateProductCommand command, CancellationToken cancellationToken)
        {
            Product product;

            if (command.Id.HasValue)
            {
                product = await _unitOfWork.ProductRepository.GetByIdAsync(command.Id.Value)
                    ?? throw new NotFoundException(nameof(Product), command.Id.Value);
                product.Update(command.Name, command.Description, new Domain.ValueObjects.Money(command.Amount, command.Currency), ProductStatus.Active, command.Active, command.StockQuantity);
            }
            else
            {
                product = new Product(command.Name, command.Description, new Domain.ValueObjects.Money(command.Amount, command.Currency), ProductStatus.Active, command.Active, command.StockQuantity);
                _unitOfWork.ProductRepository.AddProduct(product);
            }

            product.ReplacePhotos(command.Photos);

            if (command.GroupId.HasValue)
                product.AssignToGroup(command.GroupId.Value);

            if (command.CategoryId.HasValue)
                product.AssignToCategory(command.CategoryId.Value);

            if (command.SubCategoryId.HasValue)
                product.AssignToSubCategory(command.SubCategoryId.Value);

            if (command.Attributes != null && command.Attributes.Any())
            {
                var attributeValues = command.Attributes.Select(a =>
                    new AttributeValue(a.Id, a.Value, a.IsPrimary));
                product.ReplaceAttributes(attributeValues);
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            var savedProduct = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id);

            var attributeDefinitions = await _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => savedProduct.Attributes.Select(a => a.AttributeDefinitionId).Contains(ad.Id)).ToListAsync(cancellationToken: cancellationToken);

            return CreateOrUpdateProductMapper.MapToCreateOrUpdateProductResult(savedProduct, attributeDefinitions);
        }
    }
}
