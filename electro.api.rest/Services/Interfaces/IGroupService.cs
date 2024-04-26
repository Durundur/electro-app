using electro.api.rest.Dtos;

namespace electro.api.rest.Services.Interfaces
{
    public interface IGroupService
    {
        CategoryDto AddCategory(CategoryDto category);
        GroupDto AddGroup(GroupDto group);
        SubCategoryDto AddSubCategory(SubCategoryDto subCategory);
        bool DeleteCategory(int id);
        bool DeleteGroup(int id);
        bool DeleteSubCategory(int id);
        IEnumerable<GroupDto> GetAll();
        CategoryDto UpdateCategory(CategoryDto category);
        GroupDto UpdateGroup(GroupDto group);
        SubCategoryDto UpdateSubCategory(SubCategoryDto subCategory);
    }
}