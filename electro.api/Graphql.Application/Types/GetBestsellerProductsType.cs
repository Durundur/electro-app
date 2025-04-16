using Domain.Aggregates.ProductCatalogAggregate;
using HotChocolate.Types;

namespace Graphql.Application.Types
{
    public class GetBestsellerProductsType: ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
            descriptor.Field(f => f.AddOpinion).Ignore();

            descriptor
               .Field("salesCount")
               .Type<NonNullType<IntType>>()
               .Resolve(context => 100);
        }
    }
}
