using Application.Exceptions;
using Application.Services.Models;
using Domain.Aggregates.OrderAggregate;
using Domain.Reposiotories;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrderAsync(Guid userId, OrderModel orderModel, CancellationToken cancellationToken = default)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync(cancellationToken: cancellationToken);

                var productIds = orderModel.Products.Select(p => p.ProductId).OrderBy(id => id).ToList();
                var products = await _unitOfWork.ProductRepository.GetProductsByIdsWithLockAsync(productIds, cancellationToken);
                var orderProducts = new List<OrderProduct>();

                foreach (var orderProductModel in orderModel.Products)
                {
                    var product = products.FirstOrDefault(p => p.Id == orderProductModel.ProductId);

                    if (product == null)
                    {
                        throw new BadRequestException($"Product with ID {orderProductModel.ProductId} does not exist");
                    }

                    if (product.StockQuantity < orderProductModel.Quantity)
                    {
                        throw new InvalidOperationException($"Insufficient stock for product {product.Name}. Requested: {orderProductModel.Quantity}");
                    }

                    product.UpdateStockQuantity(product.StockQuantity - orderProductModel.Quantity);

                    var orderProduct = OrderProduct.Create(product, product.Name, orderProductModel.Quantity, product.EffectivePrice);
                    orderProducts.Add(orderProduct);
                }

                    var payment = Payment.Create(orderModel.PaymentMethod, new Money((decimal)1.99, "PLN"));

                    var delivery = Delivery.Create(orderModel.DeliveryMethod, new Money((decimal)8.99, "PLN"));

                    var recipient = Recipient.Create(orderModel.Recipient.Type, orderModel.Recipient.FirstName, orderModel.Recipient.Surname, orderModel.Recipient.CompanyName, 
                        orderModel.Recipient.TaxIdentificationNumber, orderModel.Recipient.PhoneNumber, orderModel.Recipient.Street, orderModel.Recipient.HouseNumber,
                        orderModel.Recipient.PostalCode, orderModel.Recipient.City);

                    var order = Order.Create(userId, orderProducts, payment, delivery, recipient);

                    await _unitOfWork.OrderRepository.AddOrderAsync(order, cancellationToken);
                    await _unitOfWork.CartRepository.DeleteUserCartAsync(userId, cancellationToken);
                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitTransactionAsync(cancellationToken);

                    return order;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                throw new BadRequestException($"Failed to create order", ex);
            }
        }

        public async Task<Order> GetOrderByIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(orderId, cancellationToken);

            return order;
        }

        public async Task<(List<Order> Orders, int totalOrders)> GetOrdersAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            var ordersQuery = _unitOfWork.OrderRepository.GetOrdersQuery().AsNoTracking().OrderByDescending(o => o.CreatedAt);

            var totalOrders = await ordersQuery.CountAsync(cancellationToken);

            var orders = await ordersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return (orders, totalOrders);
        }

        public async Task<(List<Order> Orders, int totalOrders)> GetUserOrdersAsync(Guid userId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            var ordersQuery = _unitOfWork.OrderRepository.GetOrdersQuery()
                .AsNoTracking()
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt);

            var totalOrders = await ordersQuery.CountAsync();

            var orders = await ordersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return (orders, totalOrders);
        }

        public async Task<Order> UpdateOrderAsync(Guid orderId, OrderStatus newStatus, string? trackingNumber = null, RecipientModel? recipient = null, CancellationToken cancellationToken = default)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(orderId, cancellationToken);

            if (order == null)
            {
                throw new NotFoundException($"Order with ID {orderId} was not found");
            }

            if (recipient != null)
            {
                var allowedStatuses = new[] { OrderStatus.Created, OrderStatus.Processing, OrderStatus.Paid };
                if (allowedStatuses.Contains(order.Status))
                {
                    order.UpdateRecipient(recipient.Type, recipient.FirstName, recipient.Surname, recipient.CompanyName, recipient.TaxIdentificationNumber,
                        recipient.PhoneNumber, recipient.Street, recipient.HouseNumber, recipient.PostalCode, recipient.City);
                }
            }

            if (!string.IsNullOrWhiteSpace(trackingNumber))
            {
                if (order.Status != OrderStatus.Processing || newStatus!= OrderStatus.Shipped)
                {
                    throw new InvalidOperationException("Tracking number can only be set when changing status from Processing to Shipped");
                }

                order.UpdateTrackingNumber(trackingNumber);
            }

            order.UpdateStatus(newStatus);

            await _unitOfWork.SaveChangesAsync();

            return order;
        }
    }
}
