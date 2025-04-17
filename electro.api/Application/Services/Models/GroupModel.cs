namespace Application.Services.Models
{
    public class GroupModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public IList<AttributeDefinitionModel> Attributes { get; set; }
    }
}
