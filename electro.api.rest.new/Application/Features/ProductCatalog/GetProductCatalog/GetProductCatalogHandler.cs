using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogHandler : IRequestHandler<GetProductCatalogQuery, GetProductCatalogResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductCatalogHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetProductCatalogResult> Handle(GetProductCatalogQuery request, CancellationToken cancellationToken)
        {
            var productsQuery = _unitOfWork.ProductRepository.GetProductsQuery();

            var totalProducts = await productsQuery.CountAsync();

            var products = await productsQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            var pageCount = (int)Math.Ceiling(totalProducts / (double)request.PageSize);

            var result = GetProductCatalogMapper.MapToGetProductCatalogResult(products);

            result.PageCount = pageCount;
            result.PageSize = request.PageSize;
            result.Page = request.Page;

            return result;
        }
    }
}
