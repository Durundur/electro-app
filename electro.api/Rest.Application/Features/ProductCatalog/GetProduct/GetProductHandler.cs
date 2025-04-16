﻿using Application.Services.ProductService;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, GetProductResult>
    {
        private readonly IProductService _productService;

        public GetProductHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetProductResult> Handle(GetProductQuery queryParams, CancellationToken cancellationToken)
        {
            var product = await _productService.GetProductByIdAsync(queryParams.Id, cancellationToken);

            return GetProductMapper.MapToGetProductResult(product);
        }
    }
}
