using HotChocolate.Types;

namespace Graphql.Application.Mutations
{
    public class MutationType : ObjectType<Mutation>
    {
        protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
        {

        }
    }
}
