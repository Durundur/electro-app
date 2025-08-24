using Domain.Aggregates.OrderAggregate;
using Domain.Exceptions;

namespace Tests.Domain.OrderAggregate;

public class DeliveryTests
{
    [Fact]
    public void Create_WithNegativeCost_ShouldThrow()
    {
        var ex = Assert.Throws<DomainException>(() =>
            Delivery.Create(DeliveryMethod.CourierStandard, Builders.PLN(-1)));
        Assert.Equal("Amount cannot be negative", ex.Message);
    }

    [Fact]
    public void SetTrackingNumber_Empty_ShouldThrow()
    {
        var delivery = Builders.Delivery();

        var ex = Assert.Throws<DomainException>(() => delivery.SetTrackingNumber("  "));
        Assert.Equal("Tracking number cannot be empty.", ex.Message);
    }

    [Fact]
    public void SetTrackingNumber_TooLong_ShouldThrow()
    {
        var delivery = Builders.Delivery();
        var longStr = new string('X', 51);

        var ex = Assert.Throws<DomainException>(() => delivery.SetTrackingNumber(longStr));
        Assert.Equal("Tracking number cannot be longer than 50 characters.", ex.Message);
    }

    [Fact]
    public void MarkAsShipped_FromPending_ShouldSucceed()
    {
        var delivery = Builders.Delivery();
        delivery.MarkAsShipped();

        Assert.Equal(DeliveryStatus.Shipped, delivery.Status);
        Assert.NotNull(delivery.ShippedAt);
    }

    [Fact]
    public void MarkAsShipped_NotFromPending_ShouldThrow()
    {
        var delivery = Builders.Delivery();
        delivery.MarkAsShipped();

        var ex = Assert.Throws<DomainException>(() => delivery.MarkAsShipped());
        Assert.Equal("Only pending deliveries can be marked as shipped.", ex.Message);
    }

    [Fact]
    public void MarkAsDelivered_FromShipped_ShouldSucceed()
    {
        var delivery = Builders.Delivery();
        delivery.MarkAsShipped();

        delivery.MarkAsDelivered();

        Assert.Equal(DeliveryStatus.Delivered, delivery.Status);
        Assert.NotNull(delivery.DeliveredAt);
    }

    [Fact]
    public void MarkAsDelivered_NotFromShipped_ShouldThrow()
    {
        var delivery = Builders.Delivery();

        var ex = Assert.Throws<DomainException>(() => delivery.MarkAsDelivered());
        Assert.Equal("Only shipped deliveries can be marked as delivered.", ex.Message);
    }
}