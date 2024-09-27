using AutoMapper;
using electro.api.rest.Dtos.Product;
using electro.api.rest.DTOs.Product;
using electro.api.rest.DTOs.ProductHierarchy;
using electro.api.rest.Models.Product;
using electro.api.rest.Models.ProductHierarchy;

namespace electro.api.rest.Mapper
{
    public class ProductMapperProfile : Profile
    {
        public ProductMapperProfile()
        {
            CreateMap<ProductModel, ProductDto>()
              .ForMember(dest => dest.Specification, opt => opt.MapFrom(src => src.Specification.Specification))
              .ForMember(dest => dest.Group, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<ProductHierarchyDto>(src.Group)))
              .ForMember(dest => dest.Category, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<ProductHierarchyDto>(src.Category)))
              .ForMember(dest => dest.SubCategory, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<ProductHierarchyDto>(src.SubCategory)));

            CreateMap<ProductDto, ProductModel>()
                .ForMember(dest => dest.Specification, opt => opt.MapFrom(src => new ProductSpecificationModel() { Specification = src.Specification }))
                .ForMember(dest => dest.Group, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<GroupModel>(src.Group)))
                .ForMember(dest => dest.Category, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<CategoryModel>(src.Category)))
                .ForMember(dest => dest.SubCategory, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<SubCategoryModel>(src.SubCategory)));

            CreateMap<ProductModel, ProductOverviewDto>()
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photos.FirstOrDefault()));


        }
    }
}
