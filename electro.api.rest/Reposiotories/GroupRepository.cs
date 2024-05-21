using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public GroupRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IQueryable<GroupModel> GetGroups()
        {
            var groups = _dbContext.Groups
                .Include(g => g.Categories)
                .AsQueryable();
            return groups;
        }

        public GroupModel GetGroupById(int id)
        {
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == id);
            return group;
        }

        public GroupModel UpdateGroup(GroupModel group)
        {
            if (GetGroupById(group.Id) == null)
            {
                throw new FileNotFoundException("Group not found");
            }
            _dbContext.Groups.Update(group);
            _dbContext.SaveChanges();
            return group;
        }

        public GroupModel CreateGroup(GroupModel group)
        {
            _dbContext.Groups.Add(group);
            _dbContext.SaveChanges();
            return group;
        }

        public bool DeleteGroup(int id)
        {
            var group = GetGroups().FirstOrDefault(g => g.Id == id);
            if (group == null)
            {
                throw new FileNotFoundException("Group not found");
            }
            if (group.Categories.Any())
            {
                throw new InvalidOperationException("Cannot delete group with associated categories");
            }
            _dbContext.Groups.Remove(group);
            _dbContext.SaveChanges();
            return true;

        }







        public CategoryModel UpdateCategory(CategoryModel category)
        {
            _dbContext.Categories.Update(category);
            _dbContext.SaveChanges();
            return category;
        }

        public IQueryable<CategoryModel> GetCategories()
        {
            var categories = _dbContext.Categories
                .Include(c => c.SubCategories)
                .AsQueryable();
            return categories;
        }

        public CategoryModel GetCategoryById(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            return category;
        }

        public IQueryable<SubCategoryModel> GetSubCategories()
        {
            var subCategories = _dbContext.SubCategories.AsQueryable();
            return subCategories;
        }

        public SubCategoryModel CreateSubCategory(SubCategoryModel subCategory)
        {
            _dbContext.SubCategories.Add(subCategory);
            _dbContext.SaveChanges();
            return subCategory;
        }

        public CategoryModel CreateCategory(CategoryModel category)
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return category;
        }





        public bool DeleteCategory(int id)
        {
            var category = _dbContext.Categories.Include(c => c.SubCategories).FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                throw new FileNotFoundException("Category not found");
            }
            else
            {
                if (category.SubCategories.Any())
                {
                    throw new InvalidOperationException("Cannot delete category with associated subcategory.");
                }
                _dbContext.Categories.Remove(category);
                _dbContext.SaveChanges();
                return true;
            }
        }

        public bool DeleteSubCategory(int id)
        {
            var subCategory = _dbContext.SubCategories.FirstOrDefault(s => s.Id == id);
            if (subCategory == null)
            {
                throw new FileNotFoundException();
            }
            else
            {
                if (subCategory.Category != null)
                {
                    throw new InvalidOperationException("Cannot delete subcategory with associated category.");
                }
                _dbContext.SubCategories.Remove(subCategory);
                _dbContext.SaveChanges();
                return true;
            }
        }

        public SubCategoryModel UpdateSubCategory(SubCategoryModel subCategory)
        {
            var existing = _dbContext.SubCategories.FirstOrDefault(s => s.Id == subCategory.Id);
            if (existing == null)
            {
                throw new FileNotFoundException();
            }
            existing.Name = subCategory.Name;
            existing.CategoryId = subCategory.CategoryId;
            _dbContext.SaveChanges();
            return existing;
        }




    }
}


/*{
   "name": "Laptopy i komputery",
  "iconUrl": "https://cdn.x-kom.pl/i/assets/img/common/groups/default/small,,laptop_desktop.png",
  "photoUrl": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2023/9/pr_2023_9_1_13_18_44_843_00.jpg",
  "categories": [
    {
      "id": 0,
      "name": "Laptopy/Notebooki/Ultrabooki",
      "subCategories": [
        {
            "id": 0,
          "name": "Notebooki/Laptopy 16\""
        },{
            "id": 0,
          "name": "Notebooki/Laptopy 15\""
        },{
            "id": 0,
          "name": "Notebooki/Laptopy 14\""
        }
      ]
    },{
        "id": 0,
      "name": "Tablety",
      "subCategories": [
        {
            "id": 0,
          "name": "Tablety 12\""
        },{
            "id": 0,
          "name": "Tablety 7\""
        }
      ]
    },{
        "id": 0,
      "name": "Laptopy 2 w 1",
      "subCategories": []
    }
  ]
}*/