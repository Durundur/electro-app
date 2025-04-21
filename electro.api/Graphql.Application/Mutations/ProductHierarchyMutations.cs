using Application.Exceptions;
using Application.Services.Models;
using Application.Services.ProductHierarchyService;
using Domain.Aggregates.ProductHierarchyAggregate;
using Graphql.Application.Mutations.Inputs;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        [Authorize(Roles = ["Admin"])]
        public async Task<bool> DeleteSubCategory([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken)
        {
            try
            {
                return await productHierarchyService.DeleteSubCategoryAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete subcategory", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<bool> DeleteCategory([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken)
        {
            try
            {
                return await productHierarchyService.DeleteCategoryAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete category", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<bool> DeleteGroup([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken)
        {
            try
            {
                return await productHierarchyService.DeleteGroupAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete group", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<Group> CreateOrUpdateGroup([Service] IProductHierarchyService productHierarchyService, CreateOrUpdateGroupInput input, CancellationToken cancellationToken)
        {
            try
            {
                var model = new GroupModel
                {
                    Id = input.Id,
                    Name = input.Name,
                    Icon = input.Icon,
                    Photo = input.Photo,
                    Active = input.Active,
                    Description = input.Description,
                    DisplayOrder = input.DisplayOrder,
                    Attributes = input.Attributes.Select(a => new AttributeDefinitionModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsFilterable = a.IsFilterable,
                        IsRequired = a.IsRequired,
                        Type = a.Type,
                    }).ToList()
                };

                var group = await productHierarchyService.CreateOrUpdateGroupAsync(model, cancellationToken);

                return group;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update group", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<Category> CreateOrUpdateCategory([Service] IProductHierarchyService productHierarchyService, CreateOrUpdateCategoryInput input, CancellationToken cancellationToken)
        {
            try
            {
                var model = new CategoryModel
                {
                    Id = input.Id,
                    Name = input.Name,
                    Description = input.Description,
                    DisplayOrder = input.DisplayOrder,
                    Active = input.Active,
                    GroupId = input.GroupId,
                    Attributes = input.Attributes.Select(a => new AttributeDefinitionModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsFilterable = a.IsFilterable,
                        IsRequired = a.IsRequired,
                        Type = a.Type,
                    }).ToList(),
                };

                var category = await productHierarchyService.CreateOrUpdateCategoryAsync(model, cancellationToken);

                return category;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update category", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<SubCategory> CreateOrUpdateSubCategory([Service] IProductHierarchyService productHierarchyService, CreateOrUpdateSubCategoryInput input, CancellationToken cancellationToken)
        {
            try
            {
                var model = new SubCategoryModel
                {
                    Id = input.Id,
                    Name = input.Name,
                    Description = input.Description,
                    DisplayOrder = input.DisplayOrder,
                    Active = input.Active,
                    CategoryId = input.CategoryId,
                    Attributes = input.Attributes.Select(a => new AttributeDefinitionModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsFilterable = a.IsFilterable,
                        IsRequired = a.IsRequired,
                        Type = a.Type,
                    }).ToList(),
                };

                var subCategory = await productHierarchyService.CreateOrUpdateSubCategoryAsync(model, cancellationToken);

                return subCategory;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update subcategory", ex);
            }
        }
    }
}
