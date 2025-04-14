namespace Rest.Application.Features.ProductHierarchy.GetMenu
{
    public class GetMenuResult
    {
        public IList<GetMenuGroup> Groups { get; set; }
    }

    public class GetMenuGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Icon { get; set; }
        public IList<GetMenuCategory> Categories { get; set; }
    }

    public class GetMenuCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<GetMenuSubCategory> SubCategories { get; set; }
    }

    public class GetMenuSubCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
