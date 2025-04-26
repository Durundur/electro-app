using Domain.Aggregates.ProductCatalogAggregate;
using HotChocolate.Types;

namespace Graphql.Application.Queries.Types
{
    public class ProductType : ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
            descriptor
                .Field("averageOpinionRating")
                .Type<FloatType>()
                .Resolve(context =>
                {
                    var product = context.Parent<Product>();
                    return product.Opinions.Any() ? (float)Math.Round(product.Opinions.Average(o => o.Rating), 1) : 0;
                });

            descriptor
                .Field("opinionCount")
                .Type<IntType>()
                .Resolve(context =>
                {
                    var product = context.Parent<Product>();
                    return product.Opinions.Count();
                });

            descriptor
               .Field(p => p.Promotion)
               .Resolve(context =>
               {
                   var product = context.Parent<Product>();
                   return product.Promotion?.IsValid() == true ? product.Promotion : null;
               });
        }
    }
}
