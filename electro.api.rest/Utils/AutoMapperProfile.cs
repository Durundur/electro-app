using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Models;

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
        }
    }
}
