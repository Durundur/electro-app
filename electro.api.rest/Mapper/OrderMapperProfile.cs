using AutoMapper;
using electro.api.rest.Models.Address.Address;
using electro.api.rest.Models.Order.DeliveryDetails;
using electro.api.rest.Models.Order.OrderItem;
using electro.api.rest.Models.Order.Payment;
using electro.api.rest.Models.Order;
using electro.api.rest.Models.Recipient;
using electro.api.rest.Dtos.Cart;
using electro.api.rest.Models.Price;
using electro.api.rest.DTOs.Order.OrderCreate;
using electro.api.rest.DTOs.Order.Order;
using electro.api.rest.DTOs.Order.OrderOverview;

namespace electro.api.rest.Mapper
{
    public class OrderMapperProfile : Profile
    {
        public OrderMapperProfile()
        {
            CreateMap<OrderCreateDto, OrderModel>()
                .ForMember(dest => dest.Payment, opt => opt.MapFrom(src => new PaymentDetailsModel
                {
                    Method = Enum.Parse<PaymentMethod>(src.PaymentMethod, true)
                }))
                .ForMember(dest => dest.DeliveryDetails, opt => opt.MapFrom(src => new DeliveryDetailsModel
                {
                    Method = Enum.Parse<DeliveryMethod>(src.DeliveryDetails.Method, true),
                    Cost = src.DeliveryDetails.Cost,
                    Recipient = new OrderRecipientModel
                    {
                        RecipientType = Enum.Parse<RecipientType>(src.Recipient.Type, true),
                        Name = src.Recipient.Name,
                        Email = src.Recipient.Email,
                        PhoneNumber = src.Recipient.PhoneNumber,
                        CompanyName = src.Recipient.Type == "Company" ? src.Recipient.CompanyName : null,
                        NIP = src.Recipient.Type == "Company" ? src.Recipient.NIP : null,
                    },
                    Address = new DeliveryAddressModel
                    {
                        Street = src.DeliveryAddress.Street,
                        BuildingNumber = src.DeliveryAddress.BuildingNumber,
                        PostalCode = src.DeliveryAddress.PostalCode,
                        City = src.DeliveryAddress.City,
                        Country = src.DeliveryAddress.Country
                    }
                }))
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products.Select(op => new OrderProductModel
                {
                    ProductId = op.ProductId,
                    Quantity = op.Quantity
                }).ToList()));

            CreateMap<OrderProductModel, CartProductDto>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Product.Photos.FirstOrDefault(string.Empty)));

            CreateMap<OrderModel, OrderDto>()
                 .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => new PriceBase
                 {
                     Currency = src.DeliveryDetails.Cost.Currency, 
                     Value = src.Products.Sum(p => (decimal)(p.Price.Value) * p.Quantity)
                            + (decimal)(src.DeliveryDetails.Cost.Value)
                 }));

            CreateMap<PaymentDetailsModel, PaymentDetailsDto>();

            CreateMap<DeliveryDetailsModel, DeliveryDetailsDto>();

            CreateMap<OrderModel, OrderOverviewDto>()
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => new PriceBase
                {
                    Currency = src.DeliveryDetails.Cost.Currency,
                    Value = src.Products.Sum(p => (decimal)(p.Price.Value) * p.Quantity)
                            + (decimal)(src.DeliveryDetails.Cost.Value)
                }));
        }
    }
}
