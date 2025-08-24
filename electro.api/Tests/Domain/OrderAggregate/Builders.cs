using Domain.ValueObjects;
using OrderDomain = Domain.Aggregates.OrderAggregate;
using ProductDomain = Domain.Aggregates.ProductCatalogAggregate;
using UserDomain = Domain.Aggregates.UserAggregate;

namespace Tests.Domain.OrderAggregate;

public static class Builders
{
    public static Money PLN(decimal amount) => new Money(amount, "PLN");

    public static ProductDomain.Product Product(string name = "Prod A", decimal amount = 100m)
        => ProductDomain.Product.Create(name, "Desc", PLN(amount), stockQuantity: 100);

    public static OrderDomain.OrderProduct OrderProduct(ProductDomain.Product? product = null, int qty = 2, decimal unitAmount = 100m)
        => OrderDomain.OrderProduct.Create(product ?? Product(), (product ?? Product()).Name, qty, PLN(unitAmount));

    public static OrderDomain.Delivery Delivery(OrderDomain.DeliveryMethod method = OrderDomain.DeliveryMethod.CourierStandard, decimal cost = 15m)
        => OrderDomain.Delivery.Create(method, PLN(cost));

    public static OrderDomain.Payment Payment(OrderDomain.PaymentMethod method = OrderDomain.PaymentMethod.Blik, decimal cost = 5m)
        => OrderDomain.Payment.Create(method, PLN(cost));

    public static OrderDomain.Recipient Recipient(UserDomain.RecipientType type = UserDomain.RecipientType.Personal)
        => OrderDomain.Recipient.Create(
            type,
            firstName: "Jan",
            surname: "Kowalski",
            companyName: null,
            taxIdentificationNumber: null,
            phoneNumber: "123456789",
            street: "Ulica",
            houseNumber: "1",
            postalCode: "00-001",
            city: "Miasto");

    public static OrderDomain.Order Order(
        Guid? userId = null,
        IList<OrderDomain.OrderProduct>? products = null,
        OrderDomain.Payment? payment = null,
        OrderDomain.Delivery? delivery = null,
        OrderDomain.Recipient? recipient = null)
        => OrderDomain.Order.Create(
            userId ?? Guid.NewGuid(),
            products ?? new List<OrderDomain.OrderProduct> { OrderProduct() },
            payment ?? Payment(),
            delivery ?? Delivery(),
            recipient ?? Recipient());
}