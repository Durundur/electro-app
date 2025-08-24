using Domain.Aggregates.OrderAggregate;
using Domain.Exceptions;

namespace Tests.Domain.OrderAggregate;

public class OrderProductTests
{
    [Fact]
    public void Create_NullProduct_ShouldThrow()
    {
        var ex = Assert.Throws<DomainException>(() =>
            OrderProduct.Create(null!, "X", 1, Builders.PLN(10)));
        Assert.Equal("Product cannot be null", ex.Message);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-2)]
    public void Create_InvalidQuantity_ShouldThrow(int qty)
    {
        var ex = Assert.Throws<DomainException>(() =>
            OrderProduct.Create(Builders.Product(), "X", qty, Builders.PLN(10)));
        Assert.Equal("Quantity must be positive", ex.Message);
    }

    [Theory]
    [InlineData(0, "Price must be positive")]
    [InlineData(-5, "Amount cannot be negative")]
    public void Create_InvalidPrice_ShouldThrow(decimal price, string expectedMessage)
    {
        var ex = Assert.Throws<DomainException>(() =>
            OrderProduct.Create(Builders.Product(), "X", 1, Builders.PLN(price)));
        Assert.Equal(expectedMessage, ex.Message);
    }

    [Fact]
    public void Create_Valid_ShouldComputeTotal()
    {
        var op = OrderProduct.Create(Builders.Product(), "X", 3, Builders.PLN(12));
        Assert.Equal(36m, op.TotalPrice.Amount);
        Assert.Equal("PLN", op.TotalPrice.Currency);
    }

    [Theory]
    [InlineData(0)]
    public void UpdatedQuantity_Invalid_ShouldThrow(int newQty)
    {
        var op = OrderProduct.Create(Builders.Product(), "X", 2, Builders.PLN(10));
        var ex = Assert.Throws<DomainException>(() => op.UpdatedQuantity(newQty));
        Assert.Equal("Quantity must be positive", ex.Message);
    }

    [Fact]
    public void UpdatedQuantity_Valid_ShouldUpdate()
    {
        var op = OrderProduct.Create(Builders.Product(), "X", 2, Builders.PLN(10));
        op.UpdatedQuantity(5);
        Assert.Equal(5, op.Quantity);
    }
}