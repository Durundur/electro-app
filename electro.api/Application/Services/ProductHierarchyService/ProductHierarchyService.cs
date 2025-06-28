using Application.Exceptions;
using Domain.Aggregates.ProductHierarchyAggregate;
using Domain.Reposiotories;
using Microsoft.EntityFrameworkCore;
using Application.Services.Models;

namespace Application.Services.ProductHierarchyService
{
    public class ProductHierarchyService : IProductHierarchyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductHierarchyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<SubCategory> GetSubCategoryByIdAsync(int id, CancellationToken cancellationToken)
        {
            var subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(id, cancellationToken);

            return subCategory;
        }

        public async Task<Category> GetCategoryByIdAsync(int id, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(id, cancellationToken);

            return category;
        }

        public async Task<Group> GetGroupByIdAsync(int id, CancellationToken cancellationToken)
        {
            var group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(id, cancellationToken);

            return group;
        }

        public async Task<List<Group>> GetMenuAsync(CancellationToken cancellationToken)
        {
            var menu = await _unitOfWork.ProductHierarchyRepository.GetMenuAsync(cancellationToken);

            return menu.ToList();
        }

        public async Task<List<AttributeDefinition>> GetAttributesDefinitionsAsync(int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery();

            query = query.Where(ad =>
                groupId.HasValue && EF.Property<int>(ad, "GroupId") == groupId.Value ||
                categoryId.HasValue && EF.Property<int>(ad, "CategoryId") == categoryId.Value ||
                subCategoryId.HasValue && EF.Property<int>(ad, "SubCategoryId") == subCategoryId.Value
            );

            var attributesDefinitions = await query.ToListAsync(cancellationToken);

            return attributesDefinitions;
        }

        public async Task<List<Group>> GetProductHierarchyAsync(CancellationToken cancellationToken)
        {
            var productHierarchy = await _unitOfWork.ProductHierarchyRepository.GetAllProductHierarchiesAsync(cancellationToken);

            return productHierarchy.ToList();
        }

        public async Task<bool> DeleteSubCategoryAsync(int subCategoryId, CancellationToken cancellationToken)
        {
            var subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(subCategoryId);

            if (subCategory == null)
            {
                throw new Exception($"SubCategory with ID {subCategoryId} not found");
            }

            await _unitOfWork.ProductHierarchyRepository.DeleteSubCategoryAsync(subCategory.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(categoryId);

            if (category == null)
            {
                throw new Exception($"Category with ID {categoryId} not found");
            }

            await _unitOfWork.ProductHierarchyRepository.DeleteCategoryAsync(category.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteGroupAsync(int groupId, CancellationToken cancellationToken)
        {
            var group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(groupId);

            if (group == null)
            {
                throw new Exception($"Group with ID {groupId} not found");
            }

            await _unitOfWork.ProductHierarchyRepository.DeleteGroupAsync(group.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<SubCategory> CreateOrUpdateSubCategoryAsync(SubCategoryModel model, CancellationToken cancellationToken)
        {
            SubCategory subCategory;

            if (model.Id.HasValue)
            {
                subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(model.Id.Value);

                if (subCategory == null)
                {
                    throw new NotFoundException($"Subcategory with ID {model.Id} not found");
                }

                subCategory.Update(model.Name, model.Description, model.Active, model.DisplayOrder);
            }
            else
            {
                subCategory = SubCategory.Create(model.Name, model.Description, model.Active, model.DisplayOrder);

                subCategory.AssignToCategory(model.CategoryId);

                await _unitOfWork.ProductHierarchyRepository.AddSubCategoryAsync(subCategory, cancellationToken);
            }

            var attributesToRemove = subCategory.Attributes
                .Where(a => !model.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                subCategory.RemoveAttribute(attribute);
                await _unitOfWork.AttributeDefinitionRepository.DeleteAttributeDefinitionAsync(attribute.Id, cancellationToken);
            }

            foreach (var receivedAttribute in model.Attributes)
            {
                var existingAttribute = subCategory.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else
                {
                    var newAttribute = AttributeDefinition.Create(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    subCategory.AddAttribute(newAttribute);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return subCategory;
        }

        public async Task<Category> CreateOrUpdateCategoryAsync(CategoryModel model, CancellationToken cancellationToken)
        {
            Category category;

            if (model.Id.HasValue)
            {
                category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(model.Id.Value);

                if (category == null)
                {
                    throw new Exception($"Category with ID {model.Id} not found");
                }

                category.Update(model.Name, model.Description, model.Active, model.DisplayOrder);
            }
            else
            {
                category = Category.Create(model.Name, model.Description, model.Active, model.DisplayOrder);

                category.AssignToGroup(model.GroupId);

                await _unitOfWork.ProductHierarchyRepository.AddCategoryAsync(category, cancellationToken);
            }

            var attributesToRemove = category.Attributes
                .Where(a => !model.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                category.RemoveAttribute(attribute);
                await _unitOfWork.AttributeDefinitionRepository.DeleteAttributeDefinitionAsync(attribute.Id, cancellationToken);
            }

            foreach (var receivedAttribute in model.Attributes)
            {
                var existingAttribute = category.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else
                {
                    var newAttribute = AttributeDefinition.Create(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    category.AddAttribute(newAttribute);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return category;
        }

        public async Task<Group> CreateOrUpdateGroupAsync(GroupModel model, CancellationToken cancellationToken)
        {
            Group group;

            if (model.Id.HasValue)
            {
                group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(model.Id.Value);
                
                if(group == null)
                {
                    throw new Exception($"Group with ID {model.Id} not found");
                }

                group.Update(model.Name, model.Photo, model.Icon, model.Description, model.Active, model.DisplayOrder);
            }
            else
            {
                group = Group.Create(model.Name, model.Photo, model.Icon, model.Description, model.Active, model.DisplayOrder);
                
                await _unitOfWork.ProductHierarchyRepository.AddGroupAsync(group, cancellationToken);
            }

            var attributesToRemove = group.Attributes
                .Where(a => !model.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                group.RemoveAttribute(attribute);
                await _unitOfWork.AttributeDefinitionRepository.DeleteAttributeDefinitionAsync(attribute.Id, cancellationToken);
            }

            foreach (var receivedAttribute in model.Attributes)
            {
                var existingAttribute = group.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else
                {
                    var newAttribute = AttributeDefinition.Create(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    group.AddAttribute(newAttribute);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return group;
        }
    }
}
