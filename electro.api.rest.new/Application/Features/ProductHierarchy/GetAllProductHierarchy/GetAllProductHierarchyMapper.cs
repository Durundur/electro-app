using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductHierarchy.GetProductHierarchy
{
    public static class GetAllProductHierarchyMapper
    {
        public static GetAllProductHierarchyResult MapToGetAllProductHierarchyResult(IList<Group> groups)
        {
            return new GetAllProductHierarchyResult()
            {
                Groups = groups.Select(g => MapToGroupResult(g)).ToList()
            };
        }

        private static GetAllProductHierarchyGroup MapToGroupResult(Group group)
        {
            return new GetAllProductHierarchyGroup
            {
                Id = group.Id,
                Name = group.Name,
                Icon = group.Icon,
                Photo = group.Photo,
                Categories = group.Categories.Select(c => MapToCategoryResult(c)).ToList()
            };
        }

        private static GetAllProductHierarchyCategory MapToCategoryResult(Category category)
        {
            return new GetAllProductHierarchyCategory
            {
                Id = category.Id,
                Name = category.Name,
                SubCategories = category.SubCategories.Select(sc => MapToSubCategoryResult(sc)).ToList()
            };
        }

        private static GetAllProductHierarchySubCategory MapToSubCategoryResult(SubCategory subCategory)
        {
            return new GetAllProductHierarchySubCategory
            {
                Id = subCategory.Id,
                Name = subCategory.Name
            };
        }
    }
}
