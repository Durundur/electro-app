using Domain.Aggregates.ProductHierarchyAggregate;

namespace Domain.Reposiotories
{
    public interface IProductHierarchyRepository
    {
        Task<IList<Group>> GetAllProductHierarchiesAsync();
        Task<Group> GetGroupByIdAsync(int id);
        void DeleteGroup(Group group);
        void AddGroup(Group group);
        Task<Category> GetCategoryByIdAsync(int id);
        void DeleteCategory(Category category);
        void AddCategory(Category category);
        Task<SubCategory> GetSubCategoryByIdAsync(int id);
        void DeleteSubCategory(SubCategory subCategory);
        void AddSubCategory(SubCategory subCategory);
        Task<IList<Group>> GetMenuAsync();
    }
}
