using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IGroupRepository
    {
        IQueryable<GroupModel> GetGroups();
        Task<GroupModel> GetGroupById(int id);
        Task<GroupModel> CreateGroup(GroupModel group);
        Task<GroupModel> UpdateGroup(GroupModel group);
        Task<bool> DeleteGroup(int id);


        IQueryable<CategoryModel> GetCategories();
        Task<CategoryModel> GetCategoryById(int id);
        Task<CategoryModel> CreateCategory(CategoryModel category);
        Task<CategoryModel> UpdateCategory(CategoryModel category);
        Task<bool> DeleteCategory(int id);



        IQueryable<SubCategoryModel> GetSubCategories();
        Task<SubCategoryModel> GetSubCategoryById(int id);
        Task<SubCategoryModel> CreateSubCategory(SubCategoryModel subCategory);
        Task<SubCategoryModel> UpdateSubCategory(SubCategoryModel subCategory);
        Task<bool> DeleteSubCategory(int id);   
        
    }
}