using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IGroupRepository
    {
        CategoryModel AddCategory(CategoryModel category);
        GroupModel AddGroup(GroupModel group);
        SubCategoryModel AddSubCategory(SubCategoryModel subCategory);
        bool DeleteCategory(int id);
        bool DeleteGroup(int id);
        bool DeleteSubCategory(int id);
        IEnumerable<GroupModel> GetAll();
        CategoryModel UpdateCategory(CategoryModel category);
        GroupModel UpdateGroup(GroupModel group);
        SubCategoryModel UpdateSubCategory(SubCategoryModel subCategory);
    }
}