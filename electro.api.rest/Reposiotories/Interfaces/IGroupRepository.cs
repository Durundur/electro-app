using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IGroupRepository
    {
        IQueryable<GroupModel> GetGroups();
        GroupModel GetGroupById(int id);
        GroupModel CreateGroup(GroupModel group);
        GroupModel UpdateGroup(GroupModel group);
        bool DeleteGroup(int id);


        IQueryable<CategoryModel> GetCategories();
        CategoryModel GetCategoryById(int id);
        CategoryModel CreateCategory(CategoryModel category);
        CategoryModel UpdateCategory(CategoryModel category);
        bool DeleteCategory(int id);



        IQueryable<SubCategoryModel> GetSubCategories();
        SubCategoryModel CreateSubCategory(SubCategoryModel subCategory);
        SubCategoryModel UpdateSubCategory(SubCategoryModel subCategory);
        bool DeleteSubCategory(int id);   
        
    }
}