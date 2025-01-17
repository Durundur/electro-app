using Application.Reposiotories;
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

        public async Task<IList<Group>> GetAllProductHierarchiesAsync()
        {
            return await _context.Groups
                .Include(g => g.Categories
                    .OrderBy(c => c.DisplayOrder))
                    .ThenInclude(c => c.SubCategories
                        .OrderBy(sc => sc.DisplayOrder))
                .OrderBy(g => g.DisplayOrder)
                .ToListAsync();
        }

        public async Task<IList<Group>> GetMenuAsync()
        {
            return await _context.Groups
                .Where(g => g.Active)
                .Include(g => g.Categories
                    .Where(c => c.Active)
                    .OrderBy(c => c.DisplayOrder))
                    .ThenInclude(c => c.SubCategories
                            .Where(sc => sc.Active)
                            .OrderBy(sc => sc.DisplayOrder))
                .OrderBy(g => g.DisplayOrder).ToListAsync();
        }

        public async Task<Group> GetGroupByIdAsync(int id)
        {
            return await _context.Groups.Include(g => g.Attributes).FirstOrDefaultAsync(g => g.Id == id);
        }

        public void DeleteGroup(Group group)
        {
            _context.Groups.Remove(group);
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.Include(g => g.Attributes).FirstOrDefaultAsync(c => c.Id == id);
        }

        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public void DeleteCategory(Category category)
        {
            _context.Categories.Remove(category);
        }

        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
        }

        public async Task<SubCategory> GetSubCategoryByIdAsync(int id)
        {
            return await _context.SubCategories.Include(sc => sc.Attributes).FirstOrDefaultAsync(s => s.Id == id);
        }

        public void DeleteSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Remove(subCategory);
        }

        public void AddSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Add(subCategory);
        }
    }
}
