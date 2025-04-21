using Domain.Aggregates.CartAggregate;

namespace Graphql.Application.Mutations.Types
{
    public class ValidateCartType
    {
        public Cart Cart { get; set; }
        public List<string> Errors { get; set; }
    }
}
