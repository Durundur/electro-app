namespace Graphql.Application.Mutations.Inputs
{
    public class CreateOrUpdateCategoryInput
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public int GroupId { get; set; }
        public IList<AttributeDefinitionInput> Attributes { get; set; }
    }
}
