using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetProduct
{
    public class GetProductHandler: IRequestHandler<GetProductQuery, GetProductResult>
    {
        private readonly IProductRepository _productRepository;
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public GetProductHandler(IProductRepository productRepository, IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _productRepository = productRepository;
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }

        public async Task<GetProductResult> Handle(GetProductQuery queryParams, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetByIdAsync(queryParams.Id);

            var attributeDefinitions = await _attributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => product.Attributes.Select(a => a.AttributeDefinitionId).Contains(ad.Id))
                .ToListAsync();

            return GetProductMapper.MapToGetProductQueryResult(product, attributeDefinitions);
        }
    }
}
