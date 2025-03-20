using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, GetProductResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetProductResult> Handle(GetProductQuery queryParams, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(queryParams.Id, cancellationToken);

            var attributeDefinitions = await _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery()
                .Where(ad => product.Attributes.Select(a => a.AttributeDefinitionId).Contains(ad.Id))
                .ToListAsync();

            return GetProductMapper.MapToGetProductQueryResult(product, attributeDefinitions);
        }
    }
}
