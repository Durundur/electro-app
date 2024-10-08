﻿using electro.api.rest.Exceptions;
using electro.api.rest.Models;
using electro.api.rest.Models.ProductHierarchy;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class ProductHierarchyRepository : IProductHierarchyRepository
    {
        private readonly ApplicationDbContext dbContext;
        public ProductHierarchyRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public IQueryable<GroupModel> GetGroups()
        {
            var groups = dbContext.Groups.AsQueryable();
            return groups;
        }

        public async Task<GroupModel> GetGroupById(int id)
        {
            var group = await dbContext.Groups.FindAsync(id);
            return group;
        }

        public async Task<GroupModel> UpdateGroup(GroupModel group)
        {
            var existingGroup = await dbContext.Groups.Include(g => g.Categories).FirstOrDefaultAsync(g => g.Id == group.Id);
            if (existingGroup == null)
            {
                throw new NotFoundException("Group not found");
            }
            existingGroup.Name = group.Name;
            existingGroup.Photo = group.Photo;
            existingGroup.Icon = group.Icon;
            existingGroup.Categories.Clear();
            foreach (var category in group.Categories)
            {
                var existingCategory = await dbContext.Categories.FindAsync(category.Id);
                if (existingCategory == null)
                {
                    throw new InvalidOperationException($"Category {category.Name} not found");
                }
                if (existingCategory.GroupId != existingGroup.Id && existingCategory.GroupId != null)
                {
                    throw new InvalidOperationException($"Category {existingCategory.Name} is already assigned to another group and cannot be assigned again.");
                }
                existingGroup.Categories.Add(existingCategory);
            }
            return existingGroup;
        }

        public async Task<GroupModel> CreateGroup(GroupModel group)
        {
            var categoriesWithFK = new List<CategoryModel>();
            foreach (var category in group.Categories)
            {
                var existingCategory = await dbContext.Categories.FindAsync(category.Id);
                if (existingCategory == null)
                {
                    throw new InvalidOperationException($"Category {category.Name} not found");
                }
                if (existingCategory.GroupId != null)
                {
                    throw new InvalidOperationException($"Category {existingCategory.Name} is already assigned to another group and cannot be assigned again.");
                }
                categoriesWithFK.Add(existingCategory);
            }
            group.Categories = categoriesWithFK;
            await dbContext.Groups.AddAsync(group);
            return group;
        }

        public async Task<bool> DeleteGroup(int id)
        {
            var group = await GetGroupById(id);
            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }
            group.Categories = GetCategories().Where(c => c.GroupId == group.Id).ToList();
            if (group.Categories.Any())
            {
                throw new InvalidOperationException("Cannot delete group with associated categories");
            }
            dbContext.Groups.Remove(group);
            return true;
        }

        public IQueryable<CategoryModel> GetCategories()
        {
            var categories = dbContext.Categories.AsQueryable();
            return categories;
        }

        public async Task<CategoryModel> GetCategoryById(int id)
        {
            var category = await dbContext.Categories.FindAsync(id);
            return category;
        }

        public IQueryable<SubCategoryModel> GetSubCategories()
        {
            var subCategories = dbContext.SubCategories.AsQueryable();
            return subCategories;
        }


        public async Task<SubCategoryModel> GetSubCategoryById(int id)
        {
            var subCategory = await dbContext.SubCategories.FindAsync(id);
            return subCategory;
        }


        public async Task<CategoryModel> CreateCategory(CategoryModel category)
        {
            var subCategoriesWithFK = new List<SubCategoryModel>();
            foreach (var subCategory in category.SubCategories)
            {
                var existingSubCategory = await dbContext.SubCategories.FindAsync(subCategory.Id);
                if (existingSubCategory == null)
                {
                    throw new InvalidOperationException($"Subcategory {subCategory.Name} not found");
                }
                if (existingSubCategory.CategoryId != null)
                {
                    throw new InvalidOperationException($"Subcategory {existingSubCategory.Name} is already assigned to another category and cannot be assigned again.");
                }
                subCategoriesWithFK.Add(existingSubCategory);
            }
            category.SubCategories = subCategoriesWithFK;
            await dbContext.Categories.AddAsync(category);
            return category;
        }

        public async Task<CategoryModel> UpdateCategory(CategoryModel category)
        {
            var existingCategory = await dbContext.Categories.Include(c => c.SubCategories).FirstOrDefaultAsync(c => c.Id == category.Id);
            if (existingCategory == null)
            {
                throw new NotFoundException("Category not found");
            }
            existingCategory.Name = category.Name;
            existingCategory.SubCategories.Clear();
            foreach (var subCategory in category.SubCategories)
            {
                var existingSubCategory = await dbContext.SubCategories.FindAsync(subCategory.Id);
                if (existingSubCategory == null)
                {
                    throw new InvalidOperationException($"Subcategory {subCategory.Name} not found");
                }
                if (existingSubCategory.CategoryId != existingCategory.Id && existingSubCategory.CategoryId != null)
                {
                    throw new InvalidOperationException($"Subcategory {existingSubCategory.Name} is already assigned to another category and cannot be assigned again.");
                }
                existingCategory.SubCategories.Add(existingSubCategory);
            }
            return existingCategory;
        }

        public async Task<bool> DeleteCategory(int id)
        {
            var category = await GetCategoryById(id);
            if(category == null)
            {
                throw new NotFoundException("Category not found");
            }
            await dbContext.Entry(category).Collection(c => c.SubCategories).LoadAsync();
            if (category.SubCategories.Any() || category.GroupId != null)
            {
                throw new InvalidOperationException("Cannot delete categoty with associated subcategories or group");
            }
            dbContext.Categories.Remove(category);
            return true;
        }

        public async Task<SubCategoryModel> CreateSubCategory(SubCategoryModel subCategory)
        {
            await dbContext.SubCategories.AddAsync(subCategory);
            return subCategory;
        }

        public async Task<bool> DeleteSubCategory(int id)
        {
            var existingSubCategory = await GetSubCategoryById(id);
            if(existingSubCategory == null)
            {
                throw new NotFoundException("Subcategory not found");
            }
            if(existingSubCategory.CategoryId != null)
            {
                throw new InvalidOperationException("Cannot delete subcategory with associated category");
            }
            dbContext.SubCategories.Remove(existingSubCategory);
            return true;
        }

        public async Task<SubCategoryModel> UpdateSubCategory(SubCategoryModel subCategory)
        {
            var existingSubCategory = await GetSubCategoryById(subCategory.Id);
            existingSubCategory.Name = subCategory.Name;
            return existingSubCategory;
        }
    }
}
