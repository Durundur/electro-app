using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using Domain.Aggregates.ProductHierarchyAggregate;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        [Authorize(Roles = ["Admin"])]
        public async Task<SubCategory> GetSubCategory([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetSubCategoryByIdAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get subcategory", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<Category> GetCategory([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetCategoryByIdAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get category", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<Group> GetGroup([Service] IProductHierarchyService productHierarchyService, int id, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetGroupByIdAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get category", ex);
            }
        }

        public async Task<List<Group>> GetMenu([Service] IProductHierarchyService productHierarchyService, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetMenuAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get menu", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<List<AttributeDefinition>> GetAttributesDefinitions([Service] IProductHierarchyService productHierarchyService, int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetAttributesDefinitionsAsync(groupId, categoryId, subCategoryId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get attributes definitions", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<List<Group>> GetProductHierarchy([Service] IProductHierarchyService productHierarchyService, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productHierarchyService.GetProductHierarchyAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product hierarchy", ex);
            }
        }
    }
}
