namespace Application.Features.ProductHierarchy.GetProductHierarchy
{
    public class GetAllProductHierarchyResult
    {
        public IList<GetAllProductHierarchyGroup> Groups { get; set; }

    }

    public class GetAllProductHierarchyGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Icon { get; set; }
        public IList<GetAllProductHierarchyCategory> Categories { get; set; }
    }

    public class GetAllProductHierarchyCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<GetAllProductHierarchySubCategory> SubCategories { get; set; }
    }

    public class GetAllProductHierarchySubCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
