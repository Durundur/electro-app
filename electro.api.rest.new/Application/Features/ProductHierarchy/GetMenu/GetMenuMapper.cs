using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductHierarchy.GetMenu
{
    public static class GetMenuMapper
    {
        public static GetMenuResult MapToGetMenuResult(IList<Group> groups)
        {
            return new GetMenuResult()
            {
                Groups = groups.Select(g => MapToGroupResult(g)).ToList()
            };
        }

        private static GetMenuCategory MapToCategoryResult(Category category)
        {
            return new GetMenuCategory
            {
                Id = category.Id,
                Name = category.Name,
                SubCategories = category.SubCategories.Select(sc => MapToSubCategoryResult(sc)).ToList()
            };
        }

        private static GetMenuSubCategory MapToSubCategoryResult(SubCategory subCategory)
        {
            return new GetMenuSubCategory
            {
                Id = subCategory.Id,
                Name = subCategory.Name
            };
        }

        private static GetMenuGroup MapToGroupResult(Group group)
        {
            return new GetMenuGroup
            {
                Id = group.Id,
                Name = group.Name,
                Icon = group.Icon,
                Photo = group.Photo,
                Categories = group.Categories.Select(c => MapToCategoryResult(c)).ToList()
            };
        }
    }
}
