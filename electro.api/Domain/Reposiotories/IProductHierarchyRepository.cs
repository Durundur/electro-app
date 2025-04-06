using Domain.Aggregates.ProductHierarchyAggregate;

namespace Domain.Reposiotories
{
    public interface IProductHierarchyRepository
    {
        Task<IList<Group>> GetAllProductHierarchiesAsync(CancellationToken cancellationToken = default);
        Task<Group> GetGroupByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<Group> AddGroupAsync(Group group, CancellationToken cancellationToken = default);
        Task<Category> GetCategoryByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<Category> AddCategoryAsync(Category category, CancellationToken cancellationToken = default);
        Task<SubCategory> GetSubCategoryByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<SubCategory> AddSubCategoryAsync(SubCategory subCategory, CancellationToken cancellationToken = default);
        Task<IList<Group>> GetMenuAsync(CancellationToken cancellationToken = default);
        Task DeleteCategoryAsync(int categoryId, CancellationToken cancellationToken = default);
        Task DeleteSubCategoryAsync(int subCategoryId, CancellationToken cancellationToken = default);
        Task DeleteGroupAsync(int groupId, CancellationToken cancellationToken = default);
    }
}
