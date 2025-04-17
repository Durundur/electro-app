using Application.Services.Models;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Services.ProductHierarchyService
{
    public interface IProductHierarchyService
    {
        Task<bool> DeleteCategoryAsync(int categoryId, CancellationToken cancellationToken);
        Task<bool> DeleteGroupAsync(int groupId, CancellationToken cancellationToken);
        Task<bool> DeleteSubCategoryAsync(int subCategoryId, CancellationToken cancellationToken);
        Task<List<AttributeDefinition>> GetAttributesDefinitionsAsync(int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken);
        Task<Category> GetCategoryByIdAsync(int id, CancellationToken cancellationToken);
        Task<Group> GetGroupByIdAsync(int id, CancellationToken cancellationToken);
        Task<List<Group>> GetMenuAsync(CancellationToken cancellationToken);
        Task<List<Group>> GetProductHierarchyAsync(CancellationToken cancellationToken);
        Task<SubCategory> GetSubCategoryByIdAsync(int id, CancellationToken cancellationToken);
        Task<SubCategory> CreateOrUpdateSubCategoryAsync(SubCategoryModel model, CancellationToken cancellationToken);
        Task<Category> CreateOrUpdateCategoryAsync(CategoryModel model, CancellationToken cancellationToken);
        Task<Group> CreateOrUpdateGroupAsync(GroupModel model, CancellationToken cancellationToken);
    }
}
