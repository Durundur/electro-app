using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.UserAggregate;
using Domain.Exceptions;

namespace Tests.Domain.OrderAggregate;

public class OrderTests
{
    [Fact]
    public void Create_ShouldInitialize_WithCreatedStatus_And_CorrectTotalPrice()
    {
        var userId = Guid.NewGuid();
        var prod = Builders.Product(amount: 100m);
        var op = Builders.OrderProduct(prod, qty: 2, unitAmount: 100m);
        var delivery = Builders.Delivery(cost: 15m);
        var payment = Builders.Payment(cost: 5m);
        var recipient = Builders.Recipient(RecipientType.Personal);

        var order = Order.Create(userId, new List<OrderProduct> { op }, payment, delivery, recipient);

        Assert.Equal(OrderStatus.Created, order.Status);
        Assert.Equal(200m + 15m + 5m, order.TotalPrice.Amount);
        Assert.Equal(delivery.Cost.Currency, order.TotalPrice.Currency);
        Assert.NotEqual(default, order.CreatedAt);
        Assert.NotEqual(default, order.UpdatedAt);
        Assert.Single(order.Products);
    }

    [Fact]
    public void Create_ShouldThrow_WhenUserIdEmpty()
    {
        var ex = Assert.Throws<DomainException>(() => 
            Order.Create(Guid.Empty, new List<OrderProduct> { Builders.OrderProduct() }, Builders.Payment(), Builders.Delivery(), Builders.Recipient()));
        Assert.Equal("User ID cannot be empty", ex.Message);
    }

    [Fact]
    public void Create_ShouldThrow_WhenNoProducts()
    {
        var ex = Assert.Throws<DomainException>(() =>
            Order.Create(Guid.NewGuid(), new List<OrderProduct>(), Builders.Payment(), Builders.Delivery(), Builders.Recipient()));
        Assert.Equal("Order must contain at least one product", ex.Message);
    }

    [Fact]
    public void UpdateStatus_ToPaid_ShouldMarkPaymentPaid()
    {
        var order = Builders.Order();

        order.UpdateStatus(OrderStatus.Paid);

        Assert.Equal(OrderStatus.Paid, order.Status);
        Assert.Equal(PaymentStatus.Paid, order.Payment.Status);
        Assert.NotNull(order.Payment.PaidAt);
    }

    [Fact]
    public void UpdateStatus_ToCancelled_ShouldCancelPaymentWhenPending()
    {
        var order = Builders.Order();
        Assert.Equal(PaymentStatus.Pending, order.Payment.Status);

        order.UpdateStatus(OrderStatus.Cancelled);

        Assert.Equal(OrderStatus.Cancelled, order.Status);
        Assert.Equal(PaymentStatus.Failed, order.Payment.Status);
    }

    [Fact]
    public void UpdateStatus_ToShipped_WithoutTracking_ShouldThrow()
    {
        var order = Builders.Order();
        Assert.Null(order.Delivery.TrackingNumber);

        var ex = Assert.Throws<DomainException>(() => order.UpdateStatus(OrderStatus.Shipped));
        Assert.Equal("Cannot mark order as shipped without tracking number.", ex.Message);
    }

    [Fact]
    public void UpdateTrackingNumber_ShouldSet_AndTouchUpdatedAt()
    {
        var order = Builders.Order();
        var before = order.UpdatedAt;

        order.UpdateTrackingNumber("TRK-123456");

        Assert.Equal("TRK-123456", order.Delivery.TrackingNumber);
        Assert.True(order.UpdatedAt > before);
    }

    [Fact]
    public void UpdateTrackingNumber_WhenCancelled_ShouldThrow()
    {
        var order = Builders.Order();
        order.UpdateStatus(OrderStatus.Cancelled);

        var ex = Assert.Throws<DomainException>(() => order.UpdateTrackingNumber("X"));
        Assert.Equal("Cannot update tracking number of cancelled order.", ex.Message);
    }

    [Theory]
    [InlineData(OrderStatus.Created)]
    [InlineData(OrderStatus.Processing)]
    [InlineData(OrderStatus.Paid)]
    public void UpdateRecipient_InAllowedStatuses_ShouldUpdate(OrderStatus status)
    {
        var order = Builders.Order();
        if (status != OrderStatus.Created)
        {
            order.UpdateStatus(status);
        }

        order.UpdateRecipient(
            RecipientType.Personal,
            "Ala",
            "Nowak",
            null,
            null,
            "987654321",
            "Nowa",
            "2A",
            "11-111",
            "Kraków");

        Assert.Equal("Ala", order.Recipient.FirstName);
        Assert.Equal("Nowak", order.Recipient.Surname);
        Assert.Equal("987654321", order.Recipient.PhoneNumber);
        Assert.Equal("Nowa", order.Recipient.Street);
    }

    [Theory]
    [InlineData(OrderStatus.Shipped)]
    [InlineData(OrderStatus.Completed)]
    [InlineData(OrderStatus.Cancelled)]
    public void UpdateRecipient_InNotAllowedStatuses_ShouldThrow(OrderStatus status)
    {
        var order = Builders.Order();
        if (status == OrderStatus.Shipped)
        {
            order.UpdateTrackingNumber("TRK");
        }
        order.UpdateStatus(status);

        var ex = Assert.Throws<DomainException>(() =>
            order.UpdateRecipient(RecipientType.Company, null, null, "ACME", "1234567890", "123456789", "Ulica", "1", "00-000", "Miasto"));

        Assert.Equal("Can only update recipient for newly created orders.", ex.Message);
    }

    [Fact]
    public void UpdateProductQuantity_WhenCreated_ShouldUpdate()
    {
        var order = Builders.Order();
        var productId = order.Products.First().Product.Id;

        order.UpdateProductQuantity(productId, 5);

        Assert.Equal(5, order.Products.First().Quantity);
    }

    [Fact]
    public void UpdateProductQuantity_WhenNotCreated_ShouldThrow()
    {
        var order = Builders.Order();
        order.UpdateStatus(OrderStatus.Processing);

        var ex = Assert.Throws<DomainException>(() => order.UpdateProductQuantity(order.Products.First().Product.Id, 3));
        Assert.Equal("Cannot modify products after order is processed", ex.Message);
    }

    [Fact]
    public void UpdateProductQuantity_WhenProductNotFound_ShouldThrow()
    {
        var order = Builders.Order();

        var ex = Assert.Throws<DomainException>(() => order.UpdateProductQuantity(Guid.NewGuid(), 2));
        Assert.Equal("Product not found in order", ex.Message);
    }

    [Fact]
    public void UpdateStatus_FromCancelled_ShouldThrow()
    {
        var order = Builders.Order();
        order.UpdateStatus(OrderStatus.Cancelled);

        var ex = Assert.Throws<DomainException>(() => order.UpdateStatus(OrderStatus.Processing));
        Assert.Equal("Cannot update status of cancelled order.", ex.Message);
    }

    [Fact]
    public void UpdateStatus_FromCompleted_ShouldThrow()
    {
        var order = Builders.Order();
        order.UpdateStatus(OrderStatus.Completed);

        var ex = Assert.Throws<DomainException>(() => order.UpdateStatus(OrderStatus.Paid));
        Assert.Equal("Cannot update status of completed order.", ex.Message);
    }
}