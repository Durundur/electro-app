using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Order.GetOrders
{
    public class GetOrdersHandler : IRequestHandler<GetOrdersQuery, GetOrdersResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetOrdersHandler(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetOrdersResult> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var ordersQuery = _unitOfWork.OrderRepository.GetOrdersQuery()
                .Include(o => o.Products)
                .Include(o => o.Delivery)
                .Include(o=> o.Recipient)
                .Include(o => o.Payment)
                .OrderByDescending(o => o.CreatedAt);

            var totalOrders = await ordersQuery.CountAsync();

            var orders = await ordersQuery
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            var pageCount = (int)Math.Ceiling(totalOrders / (double)request.PageSize);

            var result = GetOrdersMapper.MapToGetOrdersResult(orders);

            result.PageCount = pageCount;
            result.PageSize = request.PageSize;
            result.Page = request.Page;

            return result;
        }
    }
}
