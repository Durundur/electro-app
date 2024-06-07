using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Models;
using System.Text;
using System.Text.RegularExpressions;

namespace electro.api.rest.Utils
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<GroupModel, GroupDto>();
            CreateMap<GroupDto, GroupModel>();
            CreateMap<CategoryModel, CategoryDto>();
            CreateMap<CategoryDto, CategoryModel>();
            CreateMap<SubCategoryModel, SubCategoryDto>();
            CreateMap<SubCategoryDto, SubCategoryModel>();

            CreateMap<GroupSummaryDto, GroupModel>();
            CreateMap<GroupSummaryDto, CategoryModel>();
            CreateMap<GroupSummaryDto,  SubCategoryModel>();

            CreateMap<GroupModel, GroupSummaryDto>();
            CreateMap<CategoryModel, GroupSummaryDto>();
            CreateMap<SubCategoryModel, GroupSummaryDto>();

            CreateMap<OpinionModel, OpinionDto>();
            CreateMap<OpinionDto, OpinionModel>();


            CreateMap<ProductModel, ProductDto>()
                .ForMember(dest => dest.Specification, opt => opt.MapFrom(src => src.Specification.Specification))
                .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos.Select(photoBytes => "data:image/jpeg;charset=utf-8;base64," + Convert.ToBase64String(photoBytes)).ToList()))
                .ForMember(dest => dest.Group, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<GroupSummaryDto>(src.Group)))
                .ForMember(dest => dest.Category, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<GroupSummaryDto>(src.Category)))
                .ForMember(dest => dest.SubCategory, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<GroupSummaryDto>(src.SubCategory)));

            CreateMap<ProductDto, ProductModel>()
                .ForMember(dest => dest.Specification, opt => opt.MapFrom(src => new ProductSpecificationModel() { Specification = src.Specification }))
                .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos.Select(photoBase64 => Regex.Replace(photoBase64, "^data:(.*,)?", "")).Select(Convert.FromBase64String).ToList()))
                .ForMember(dest => dest.Group, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<GroupModel>(src.Group)))
                .ForMember(dest => dest.Category, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<CategoryModel>(src.Category)))
                .ForMember(dest => dest.SubCategory, opt => opt.MapFrom((src, dest, destMember, context) => context.Mapper.Map<SubCategoryModel>(src.SubCategory)));
        }
    }
}
