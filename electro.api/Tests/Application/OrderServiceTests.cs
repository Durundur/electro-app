using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OrderService;
using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.UserAggregate;
using Domain.Exceptions;
using Domain.Reposiotories;
using Domain.ValueObjects;
using Moq;
using Recipient = Domain.Aggregates.OrderAggregate.Recipient;

namespace Tests.Application;

public class OrderServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IOrderRepository> _orderRepositoryMock;
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly Mock<ICartRepository> _cartRepositoryMock;
    private readonly OrderService _orderService;

    public OrderServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _orderRepositoryMock = new Mock<IOrderRepository>();
        _productRepositoryMock = new Mock<IProductRepository>();
        _cartRepositoryMock = new Mock<ICartRepository>();

        _unitOfWorkMock.SetupGet(u => u.OrderRepository).Returns(_orderRepositoryMock.Object);
        _unitOfWorkMock.SetupGet(u => u.ProductRepository).Returns(_productRepositoryMock.Object);
        _unitOfWorkMock.SetupGet(u => u.CartRepository).Returns(_cartRepositoryMock.Object);

        _orderService = new OrderService(_unitOfWorkMock.Object);
    }

    [Fact]
    public async Task CreateOrderAsync_ShouldCreateOrder_WhenProductsAvailable()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var productId = Guid.NewGuid();
        var orderModel = new OrderModel
        {
            Products = new List<OrderProductModel>
            {
                new OrderProductModel { ProductId = productId, Quantity = 2 }
            },
            PaymentMethod = PaymentMethod.BankTransfer,
            DeliveryMethod = DeliveryMethod.CourierCashOnDelivery,
            Recipient = new RecipientModel
            {
                Type = RecipientType.Personal,
                FirstName = "Jan",
                Surname = "Kowalski",
                City = "Warszawa",
                Street = "Testowa",
                HouseNumber = "1",
                PostalCode = "00-000",
                PhoneNumber = "123456789"
            }
        };

        var product = Product.Create("Test product", "Description", new Money(10, "PLN"), 10);
        typeof(Product).GetProperty("Id")!.SetValue(product, productId);

        _productRepositoryMock.Setup(r =>
            r.GetProductsByIdsWithLockAsync(It.IsAny<List<Guid>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Product> { product });

        // Act
        var order = await _orderService.CreateOrderAsync(userId, orderModel);

        // Assert
        Assert.NotNull(order);
        Assert.Single(order.Products);
        _orderRepositoryMock.Verify(r => r.AddOrderAsync(It.IsAny<Order>(), It.IsAny<CancellationToken>()), Times.Once);
        _cartRepositoryMock.Verify(r => r.DeleteUserCartAsync(userId, It.IsAny<CancellationToken>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateOrderAsync_ShouldThrow_WhenProductNotFound()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var orderModel = new OrderModel
        {
            Products = new List<OrderProductModel>
            {
                new OrderProductModel { ProductId = Guid.NewGuid(), Quantity = 1 }
            }
        };

        _productRepositoryMock.Setup(r =>
            r.GetProductsByIdsWithLockAsync(It.IsAny<List<Guid>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Product>());

        // Act & Assert
        await Assert.ThrowsAsync<BadRequestException>(() => _orderService.CreateOrderAsync(userId, orderModel));
        _unitOfWorkMock.Verify(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateOrderAsync_ShouldUpdateRecipient_WhenAllowedStatus()
    {
        // Arrange
        var orderId = Guid.NewGuid();
        var recipientModel = new RecipientModel
        {
            Type = RecipientType.Personal,
            FirstName = "Adam",
            Surname = "Nowak",
            City = "Kraków",
            Street = "Długa",
            HouseNumber = "5",
            PostalCode = "30-001",
            PhoneNumber = "987654321"
        };

        var product = Product.Create("Test product", "Description", new Money(10, "PLN"), 10);
        var orderProduct = OrderProduct.Create(product, product.Name, 1, product.Price);
        var order = Order.Create(Guid.NewGuid(), new List<OrderProduct> { orderProduct },
            Payment.Create(PaymentMethod.InstantTransfer, new Money(1, "PLN")),
            Delivery.Create(DeliveryMethod.CourierStandard, new Money(1, "PLN")),
            Recipient.Create(RecipientType.Personal, "Jan", "Kowalski", null, null, "123", "Test", "1", "00-000", "Warszawa")
        );

        _orderRepositoryMock.Setup(r => r.GetOrderByIdAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(order);

        // Act
        var updatedOrder = await _orderService.UpdateOrderAsync(orderId, OrderStatus.Paid, recipient: recipientModel);

        // Assert
        Assert.Equal("Adam", updatedOrder.Recipient.FirstName);
        Assert.Equal(OrderStatus.Paid, updatedOrder.Status);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateOrderAsync_ShouldThrow_WhenOrderNotFound()
    {
        // Arrange
        var orderId = Guid.NewGuid();

        _orderRepositoryMock.Setup(r => r.GetOrderByIdAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Order?)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() =>
            _orderService.UpdateOrderAsync(orderId, OrderStatus.Paid));
    }

    [Fact]
    public async Task UpdateOrderAsync_ShouldThrow_WhenInvalidStatusTransition()
    {
        // Arrange
        var orderId = Guid.NewGuid();
        var order = Order.Create(
            Guid.NewGuid(),
            new List<OrderProduct>
            {
                OrderProduct.Create(Product.Create("Test", "Description", new Money(10, "PLN"), 10), "Test", 1, new Money(10, "PLN"))
            },
            Payment.Create(PaymentMethod.Blik, new Money(1, "PLN")),
            Delivery.Create(DeliveryMethod.CourierStandard, new Money(1, "PLN")),
            Recipient.Create(RecipientType.Personal, "Jan", "Kowalski", null, null, "123456789", "Ulica", "1", "00-000", "Warszawa")
        );
        order.UpdateStatus(OrderStatus.Completed);

        _orderRepositoryMock.Setup(r => r.GetOrderByIdAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(order);

        // Act & Assert
        await Assert.ThrowsAsync<DomainException>(() =>
            _orderService.UpdateOrderAsync(orderId, OrderStatus.Paid));
    }

    [Fact]
    public async Task UpdateOrderAsync_ShouldSetTrackingNumber_WhenValidTransition()
    {
        // Arrange
        var orderId = Guid.NewGuid();
        var order = Order.Create(
            Guid.NewGuid(),
            new List<OrderProduct>
            {
                OrderProduct.Create(Product.Create("Test", "Description", new Money(10, "PLN"), 10), "Test", 1, new Money(10, "PLN"))
            },
            Payment.Create(PaymentMethod.Blik, new Money(1, "PLN")),
            Delivery.Create(DeliveryMethod.CourierStandard, new Money(1, "PLN")),
            Recipient.Create(RecipientType.Personal, "Jan", "Kowalski", null, null, "123456789", "Ulica", "1", "00-000", "Warszawa")
        );
        order.UpdateStatus(OrderStatus.Processing);

        _orderRepositoryMock.Setup(r => r.GetOrderByIdAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(order);

        // Act
        var updatedOrder = await _orderService.UpdateOrderAsync(orderId, OrderStatus.Shipped, trackingNumber: "TRACK123");

        // Assert
        Assert.Equal(OrderStatus.Shipped, updatedOrder.Status);
        Assert.Equal("TRACK123", updatedOrder.Delivery.TrackingNumber);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateOrderAsync_ShouldThrow_WhenTransactionFails()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var productId = Guid.NewGuid();
        var orderModel = new OrderModel
        {
            Products = new List<OrderProductModel>
            {
                new OrderProductModel { ProductId = productId, Quantity = 2 }
            },
            PaymentMethod = PaymentMethod.Blik,
            DeliveryMethod = DeliveryMethod.CourierStandard,
            Recipient = new RecipientModel
            {
                Type = RecipientType.Personal,
                FirstName = "Jan",
                Surname = "Kowalski",
                City = "Warszawa",
                Street = "Testowa",
                HouseNumber = "1",
                PostalCode = "00-000",
                PhoneNumber = "123456789"
            }
        };

        var product = Product.Create("Test product", "Description", new Money(10, "PLN"), 10);
        typeof(Product).GetProperty("Id")!.SetValue(product, productId);

        _productRepositoryMock.Setup(r =>
            r.GetProductsByIdsWithLockAsync(It.IsAny<List<Guid>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Product> { product });

        _unitOfWorkMock.Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .ThrowsAsync(new Exception("Transaction failed"));

        // Act & Assert
        var ex = await Assert.ThrowsAsync<BadRequestException>(() => _orderService.CreateOrderAsync(userId, orderModel));
        Assert.Contains("Failed to create order", ex.Message);
        _unitOfWorkMock.Verify(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    //[Fact]
    //public async Task CreateOrderAsync_ShouldThrow_WhenPaymentMethodInvalid()
    //{
    //    // Arrange
    //    var userId = Guid.NewGuid();
    //    var productId = Guid.NewGuid();
    //    var orderModel = new OrderModel
    //    {
    //        Products = new List<OrderProductModel>
    //        {
    //            new OrderProductModel { ProductId = productId, Quantity = 1 }
    //        },
    //        PaymentMethod = (PaymentMethod)999,
    //        DeliveryMethod = DeliveryMethod.CourierStandard,
    //        Recipient = new RecipientModel
    //        {
    //            Type = RecipientType.Personal,
    //            FirstName = "Jan",
    //            Surname = "Kowalski",
    //            City = "Warszawa",
    //            Street = "Testowa",
    //            HouseNumber = "1",
    //            PostalCode = "00-000",
    //            PhoneNumber = "123456789"
    //        }
    //    };

    //    var product = Product.Create("Test product", "Description", new Money(10, "PLN"), 10);
    //    typeof(Product).GetProperty("Id")!.SetValue(product, productId);

    //    _productRepositoryMock.Setup(r =>
    //        r.GetProductsByIdsWithLockAsync(It.IsAny<List<Guid>>(), It.IsAny<CancellationToken>()))
    //        .ReturnsAsync(new List<Product> { product });

    //    // Act & Assert
    //    var ex = await Assert.ThrowsAsync<BadRequestException>(() => _orderService.CreateOrderAsync(userId, orderModel));
    //    Assert.Equal("Failed to create order", ex.Message);

    //    var innerEx = ex.InnerException as DomainException;
    //    Assert.NotNull(innerEx);
    //    Assert.Equal($"Invalid payment method: {orderModel.PaymentMethod}", innerEx.Message);
    //}

    [Fact]
    public async Task UpdateOrderAsync_ShouldThrow_WhenTrackingNumberTooLong()
    {
        // Arrange
        var orderId = Guid.NewGuid();
        var order = Order.Create(
            Guid.NewGuid(),
            new List<OrderProduct>
            {
                OrderProduct.Create(Product.Create("Test", "Description", new Money(10, "PLN"), 10), "Test", 1, new Money(10, "PLN"))
            },
            Payment.Create(PaymentMethod.Blik, new Money(1, "PLN")),
            Delivery.Create(DeliveryMethod.CourierStandard, new Money(1, "PLN")),
            Recipient.Create(RecipientType.Personal, "Jan", "Kowalski", null, null, "123456789", "Ulica", "1", "00-000", "Warszawa")
        );
        order.UpdateStatus(OrderStatus.Processing);

        _orderRepositoryMock.Setup(r => r.GetOrderByIdAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(order);

        // Act & Assert
        var longTrackingNumber = new string('X', 51);
        await Assert.ThrowsAsync<DomainException>(() =>
            _orderService.UpdateOrderAsync(orderId, OrderStatus.Shipped, trackingNumber: longTrackingNumber));
    }

    [Fact]
    public async Task CreateOrderAsync_ShouldThrow_WhenRecipientInvalid()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var productId = Guid.NewGuid();
        var orderModel = new OrderModel
        {
            Products = new List<OrderProductModel>
            {
                new OrderProductModel { ProductId = productId, Quantity = 1 }
            },
            PaymentMethod = PaymentMethod.Blik,
            DeliveryMethod = DeliveryMethod.CourierStandard,
            Recipient = new RecipientModel
            {
                Type = RecipientType.Personal,
                FirstName = "",
                Surname = "",
                City = "",
                Street = "",
                HouseNumber = "",
                PostalCode = "",
                PhoneNumber = ""
            }
        };

        var product = Product.Create("Test product", "Description", new Money(10, "PLN"), 10);
        typeof(Product).GetProperty("Id")!.SetValue(product, productId);

        _productRepositoryMock.Setup(r =>
            r.GetProductsByIdsWithLockAsync(It.IsAny<List<Guid>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Product> { product });

        // Act & Assert
        var ex = await Assert.ThrowsAsync<BadRequestException>(() => _orderService.CreateOrderAsync(userId, orderModel));
        Assert.Equal("Failed to create order", ex.Message);

        var innerEx = ex.InnerException as ArgumentException;
        Assert.NotNull(innerEx);
        Assert.Equal("Personal recipient must have both a first name and surname", innerEx.Message);
    }
}