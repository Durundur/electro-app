namespace Graphql.Application.Mutations.Inputs
{
    public class ValidateCartInput
    {
        public IList<ValidateCartProductInput> Products { get; set; }
    }

    public class ValidateCartProductInput
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
