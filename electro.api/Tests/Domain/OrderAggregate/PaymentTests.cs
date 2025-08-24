using Domain.Aggregates.OrderAggregate;
using Domain.Exceptions;

namespace Tests.Domain.OrderAggregate;

public class PaymentTests
{
    [Fact]
    public void Create_WithNonPositiveCost_ShouldThrow()
    {
        var ex = Assert.Throws<DomainException>(() =>
            Payment.Create(PaymentMethod.Blik, Builders.PLN(0)));
        Assert.Equal("Payment cost must be greater than zero.", ex.Message);
    }

    [Fact]
    public void MarkAsPaid_FromPending_ShouldSucceed()
    {
        var payment = Builders.Payment();
        payment.MarkAsPaid();

        Assert.Equal(PaymentStatus.Paid, payment.Status);
        Assert.NotNull(payment.PaidAt);
    }

    [Fact]
    public void MarkAsPaid_NotFromPending_ShouldThrow()
    {
        var payment = Builders.Payment();
        payment.MarkAsPaid();

        Assert.Throws<InvalidOperationException>(() => payment.MarkAsPaid());
    }

    [Fact]
    public void Cancel_FromPending_ShouldSetFailed()
    {
        var payment = Builders.Payment();
        payment.Cancel();

        Assert.Equal(PaymentStatus.Failed, payment.Status);
    }

    [Fact]
    public void Cancel_FromPaid_ShouldThrow()
    {
        var payment = Builders.Payment();
        payment.MarkAsPaid();

        Assert.Throws<InvalidOperationException>(() => payment.Cancel());
    }
}