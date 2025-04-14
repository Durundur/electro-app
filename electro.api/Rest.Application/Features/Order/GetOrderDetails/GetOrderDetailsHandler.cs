using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsHandler : IRequestHandler<GetOrderDetailsQuery, GetOrderDetailsResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public GetOrderDetailsHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<GetOrderDetailsResult> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(request.Id, cancellationToken);

            if (order.UserId != _userContext.UserId && !_userContext.IsAdmin)
            {
                throw new UnauthorizedException("You do not have permission to access this order.");
            }

            var productsIds = order.Products.Select(x => x.ProductId);
            var productCatalog = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productsIds);

            return GetOrderDetailsMapper.MapToGetOrderDetailsResult(order, productCatalog);
        }
    }
}
