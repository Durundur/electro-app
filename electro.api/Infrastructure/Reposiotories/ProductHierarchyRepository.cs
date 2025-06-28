using Domain.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class ProductHierarchyRepository : IProductHierarchyRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductHierarchyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Group>> GetAllProductHierarchiesAsync(CancellationToken cancellationToken)
        {
            return await _context.Groups
                .Include(g => g.Categories
                    .OrderBy(c => c.DisplayOrder))
                    .ThenInclude(c => c.SubCategories
                        .OrderBy(sc => sc.DisplayOrder))
                .OrderBy(g => g.DisplayOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<IList<Group>> GetMenuAsync(CancellationToken cancellationToken)
        {
            return await _context.Groups
                .Where(g => g.Active)
                .Include(g => g.Categories
                    .Where(c => c.Active)
                    .OrderBy(c => c.DisplayOrder))
                    .ThenInclude(c => c.SubCategories
                            .Where(sc => sc.Active)
                            .OrderBy(sc => sc.DisplayOrder))
                .OrderBy(g => g.DisplayOrder).ToListAsync(cancellationToken);
        }

        public async Task<Group> GetGroupByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Groups
                .Include(g => g.Attributes)
                .Include(g => g.Categories)
                    .ThenInclude(c => c.SubCategories)
                .FirstOrDefaultAsync(g => g.Id == id, cancellationToken);
        }

        public async Task<Category> GetCategoryByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Categories
                .Include(g => g.Attributes)
                .Include(g => g.SubCategories)
                .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
        }

        public async Task<SubCategory> GetSubCategoryByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.SubCategories
                .Include(sc => sc.Attributes)
                .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
        }

        public async Task DeleteGroupAsync(int groupId, CancellationToken cancellationToken)
        {
            var group = await _context.Groups.FirstOrDefaultAsync(g => g.Id == groupId, cancellationToken);
            if (group != null)
            {
                _context.Groups.Remove(group);
            }
        }

        public async Task<Group> AddGroupAsync(Group group, CancellationToken cancellationToken)
        {
            var entry = await _context.Groups.AddAsync(group, cancellationToken);
            return entry.Entity;
        }

        public async Task DeleteCategoryAsync(int categoryId, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId, cancellationToken);
            if (category != null)
            {
                _context.Categories.Remove(category);
            }
        }

        public async Task<Category> AddCategoryAsync(Category category, CancellationToken cancellationToken)
        {
            var entry = await _context.Categories.AddAsync(category, cancellationToken);
            return entry.Entity;
        }

        public async Task DeleteSubCategoryAsync(int subCategoryId, CancellationToken cancellationToken)
        {
            var subCategory = await _context.SubCategories.FirstOrDefaultAsync(sc => sc.Id == subCategoryId, cancellationToken);
            if (subCategory != null)
            {
                _context.SubCategories.Remove(subCategory);
            }
        }

        public async Task<SubCategory> AddSubCategoryAsync(SubCategory subCategory, CancellationToken cancellationToken)
        {
            var entry = await _context.SubCategories.AddAsync(subCategory, cancellationToken);
            return entry.Entity;
        }
    }
}
