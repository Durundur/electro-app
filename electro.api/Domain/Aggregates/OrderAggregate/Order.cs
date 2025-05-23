﻿using Domain.Aggregates.UserAggregate;
using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Order
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public int Number { get; private set; }
        public OrderStatus Status { get; private set; }
        private readonly List<OrderProduct> _products;
        public IReadOnlyCollection<OrderProduct> Products => _products.AsReadOnly();
        public Payment Payment { get; private set; }
        public Delivery Delivery { get; private set; }
        public Recipient Recipient { get; private set; }
        public Money TotalPrice => CalculateTotalPrice();
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        private Order()
        {
            _products = new List<OrderProduct>();
        }

        public static Order Create(Guid userId, IList<OrderProduct> products, Payment payment, Delivery delivery, Recipient recipient)
        {
            if (userId == Guid.Empty)
            {
                throw new DomainException("User ID cannot be empty");
            }
                
            if (!products.Any())
            {
                throw new DomainException("Order must contain at least one product");
            }

            var order = new Order
            {
                UserId = userId,
                Status = OrderStatus.Created,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            order._products.AddRange(products);
            order.Payment = payment;
            order.Delivery = delivery;
            order.Recipient = recipient;

            return order;
        }

        private Money CalculateTotalPrice()
        {
            var productsTotal = _products.Sum(product => product.TotalPrice.Amount);
            var totalAmount = productsTotal + Delivery.Cost.Amount + Payment.Cost.Amount;
            return new Money(totalAmount, Delivery.Cost.Currency);
        }

        public void UpdateStatus(OrderStatus newStatus)
        {
            if (Status == OrderStatus.Cancelled)
            {
                throw new DomainException("Cannot update status of cancelled order.");
            }

            if (Status == OrderStatus.Completed)
            {
                throw new DomainException("Cannot update status of completed order.");
            }

            Status = newStatus;
            UpdatedAt = DateTime.UtcNow;
            HandleStatusSpecificActions(newStatus);
        }

        private void HandleStatusSpecificActions(OrderStatus newStatus)
        {
            switch (newStatus)
            {
                case OrderStatus.Paid:
                    Payment.MarkAsPaid();
                    break;
                case OrderStatus.Cancelled:
                    if (Payment.Status == PaymentStatus.Pending)
                    {
                        Payment.Cancel();
                    }
                    break;
                case OrderStatus.Shipped:
                    if (string.IsNullOrEmpty(Delivery.TrackingNumber))
                    {
                        throw new DomainException("Cannot mark order as shipped without tracking number.");
                    }
                    break;
            }
        }

        public void UpdateTrackingNumber(string trackingNumber)
        {
            if (Status == OrderStatus.Cancelled)
            {
                throw new DomainException("Cannot update tracking number of cancelled order.");
            }

            Delivery.SetTrackingNumber(trackingNumber);
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateRecipient(RecipientType type, string? firstName, string? surname,
            string? companyName, string? taxIdentificationNumber, string phoneNumber,
            string street, string houseNumber, string postalCode, string city)
        {
            var allowedStatuses = new[] { OrderStatus.Created, OrderStatus.Processing, OrderStatus.Paid };
            if (!allowedStatuses.Contains(Status))
            {
                throw new DomainException("Can only update recipient for newly created orders.");
            }

            Recipient.Update(type, firstName, surname, companyName, taxIdentificationNumber, phoneNumber, street, houseNumber, postalCode, city);
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateProductQuantity(Guid productId, int newQuantity)
        {
            if (Status != OrderStatus.Created)
            {
                throw new DomainException("Cannot modify products after order is processed");
            }

            var existingProduct = _products.FirstOrDefault(p => p.Product.Id == productId);

            if (existingProduct == null)
            {
                 throw new DomainException("Product not found in order");
            }

            existingProduct.UpdatedQuantity(newQuantity);
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
