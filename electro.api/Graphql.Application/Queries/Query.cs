using Graphql.Application.Types;
using HotChocolate.Types;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        
    }

    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Field(f => f.GetBestsellerProducts)
                .Type<NonNullType<ListType<NonNullType<GetBestsellerProductsType>>>>()
                .Description("Retrieve a list of bestseller products.");
        }
    }
}
