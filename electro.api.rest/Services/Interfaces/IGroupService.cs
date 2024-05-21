using electro.api.rest.Dtos;

namespace electro.api.rest.Services.Interfaces
{
    public interface IGroupService
    {
        CategoryDto CreateCategory(CategoryDto category);
        GroupDto CreateGroup(GroupDto group);
        SubCategoryDto CreateSubCategory(SubCategoryDto subCategory);
        bool DeleteCategory(int id);
        bool DeleteGroup(int id);
        bool DeleteSubCategory(int id);
        IEnumerable<GroupDto>GetAllGroups();
        IEnumerable<CategoryDto> GetAllCategories();
        IEnumerable<CategoryDto> GetFreeCategories();
        IEnumerable<SubCategoryDto> GetAllSubCategories();
        IEnumerable<SubCategoryDto> GetFreeSubCategories();
        CategoryDto UpdateCategory(CategoryDto category);
        GroupDto UpdateGroup(GroupDto group);
        SubCategoryDto UpdateSubCategory(SubCategoryDto subCategory);
    }
}