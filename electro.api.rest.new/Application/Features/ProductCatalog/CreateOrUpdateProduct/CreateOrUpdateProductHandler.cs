using Application.Reposiotories;
using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public class CreateOrUpdateProductHandler : IRequestHandler<CreateOrUpdateProductCommand, CreateOrUpdateProductResult>
    {
        private readonly IProductRepository _productRepository;
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public CreateOrUpdateProductHandler(IProductRepository productRepository, IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _productRepository = productRepository;
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }
        public async Task<CreateOrUpdateProductResult> Handle(CreateOrUpdateProductCommand command, CancellationToken cancellationToken)
        {
            Product product;

            if (command.Id.HasValue)
            {
                product = await _productRepository.GetByIdAsync(command.Id.Value)
                    ?? throw new Exception($"Product with ID {command.Id.Value} not found");
                product.Update(command.Name, command.Description, new Domain.ValueObjects.Money(command.Amount, command.Currency), ProductStatus.Active, command.Active, command.StockQuantity);
            }
            else
            {
                product = new Product(command.Name, command.Description, new Domain.ValueObjects.Money(command.Amount, command.Currency), ProductStatus.Active, command.Active, command.StockQuantity);
                _productRepository.AddProduct(product);
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

            await _productRepository.SaveChangesAsync();

            var savedProduct = await _productRepository.GetByIdAsync(product.Id);

            var attributeDefinitions = await _attributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => savedProduct.Attributes.Select(a => a.AttributeDefinitionId).Contains(ad.Id)).ToListAsync(cancellationToken: cancellationToken);

            return CreateOrUpdateProductMapper.MapToCreateOrUpdateProductResult(savedProduct, attributeDefinitions);
        }
    }
}
