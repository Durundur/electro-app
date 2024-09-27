using AutoMapper;
using electro.api.rest.Dtos.Cart;
using electro.api.rest.Dtos.Product;
using electro.api.rest.DTOs.Opinion;
using electro.api.rest.DTOs.Order;
using electro.api.rest.DTOs.ProductHierarchy;
using electro.api.rest.Models.Address.Address;
using electro.api.rest.Models.Cart;
using electro.api.rest.Models.Opinion;
using electro.api.rest.Models.Order;
using electro.api.rest.Models.Order.DeliveryDetails;
using electro.api.rest.Models.Order.OrderItem;
using electro.api.rest.Models.Order.Payment;
using electro.api.rest.Models.Product;
using electro.api.rest.Models.ProductHierarchy;
using electro.api.rest.Models.Recipient;
using Npgsql.EntityFrameworkCore.PostgreSQL.Query.Internal;
using System.Text.RegularExpressions;

namespace electro.api.rest.Mapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<byte[], string>().ConvertUsing<BytesToBase64Converter>();
            CreateMap<string, byte[]>().ConvertUsing<Base64ToBytesConverter>();
            CreateMap<List<byte[]>, List<string>>().ConvertUsing<ListOfBytesToListOfBase64Converter>();
            CreateMap<List<string>, List<byte[]>>().ConvertUsing<ListOfBase64ToListOfBytesConverter>();

            CreateMap<GroupModel, GroupDto>();
            CreateMap<GroupDto, GroupModel>();
            CreateMap<CategoryModel, CategoryDto>();
            CreateMap<CategoryDto, CategoryModel>();
            CreateMap<SubCategoryModel, SubCategoryDto>();
            CreateMap<SubCategoryDto, SubCategoryModel>();

            CreateMap<ProductHierarchyDto, GroupModel>();
            CreateMap<ProductHierarchyDto, CategoryModel>();
            CreateMap<ProductHierarchyDto, SubCategoryModel>();

            CreateMap<GroupModel, ProductHierarchyDto>();
            CreateMap<CategoryModel, ProductHierarchyDto>();
            CreateMap<SubCategoryModel, ProductHierarchyDto>();




            CreateMap<CartDto, CartModel>();
            CreateMap<CartModel, CartDto>();

            CreateMap<CartProductModel, CartProductDto>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Product.Photos.FirstOrDefault(string.Empty)));

            

            

            

        }
    }
}
