using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersHandler : IRequestHandler<GetUserOrdersQuery, GetUserOrdersResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetUserOrdersHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetUserOrdersResult> Handle(GetUserOrdersQuery query, CancellationToken cancellationToken)
        {
            var ordersQuery = _unitOfWork.OrderRepository.GetOrdersQuery()
                .Include(o => o.Products)
                .Include(o => o.Delivery)
                .Include(o => o.Recipient)
                .Include(o => o.Payment)
                .Where(o => o.UserId == query.UserId)
                .OrderByDescending(o => o.CreatedAt);

            var totalOrders = await ordersQuery.CountAsync(o => o.UserId == query.UserId);

            var orders = await ordersQuery
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            var pageCount = (int)Math.Ceiling(totalOrders / (double)query.PageSize);

            var orderProductsIds = orders.SelectMany(o => o.Products.Select(p => p.ProductId)).Distinct().ToList();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(orderProductsIds, cancellationToken);

            var result = GetUserOrdersMapper.MapToGetUserOrdersResult(orders, products);

            result.PageCount = pageCount;
            result.PageSize = query.PageSize;
            result.Page = query.Page;

            return result;
        }
    }
}
