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
        public IEnumerable<GroupModel> GetAll()
        {
            var groups = _dbContext.Groups
                .Include(g => g.Categories)
                    .ThenInclude(c => c.SubCategories)
                .ToList();
            return groups;
        }

        public SubCategoryModel AddSubCategory(SubCategoryModel subCategory)
        {
            _dbContext.SubCategories.Add(subCategory);
            _dbContext.SaveChanges();
            return subCategory;
        }

        public CategoryModel AddCategory(CategoryModel category)
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return category;
        }

        public GroupModel AddGroup(GroupModel group)
        {
            _dbContext.Groups.Add(group);
            _dbContext.SaveChanges();
            return group;
        }

        public bool DeleteGroup(int id)
        {
            var group = _dbContext.Groups.Include(g => g.Categories).FirstOrDefault(g => g.Id == id);
            if (group == null)
            {
                throw new FileNotFoundException();
            }
            else
            {
                if (group.Categories.Any())
                {
                    throw new InvalidOperationException("Cannot delete group with associated categories");
                }
                _dbContext.Groups.Remove(group);
                _dbContext.SaveChanges();
                return true;
            }
        }

        public bool DeleteCategory(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                throw new FileNotFoundException();
            }
            else
            {
                if (category.Group != null)
                {
                    throw new InvalidOperationException("Cannot delete category with associated group.");
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

        public CategoryModel UpdateCategory(CategoryModel category)
        {
            var existing = _dbContext.Categories.FirstOrDefault(c => c.Id == category.Id);
            if (existing == null)
            {
                throw new FileNotFoundException();
            }
            existing.Name = category.Name;
            existing.GroupId = category.GroupId;
            _dbContext.SaveChanges();
            return existing;
        }

        public GroupModel UpdateGroup(GroupModel group)
        {
            var existing = _dbContext.Groups.FirstOrDefault(g => g.Id == group.Id);
            if (existing == null)
            {
                throw new FileNotFoundException();
            }
            existing.Name = group.Name;
            existing.IconUrl = group.IconUrl;
            existing.PhotoUrl = group.PhotoUrl;
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