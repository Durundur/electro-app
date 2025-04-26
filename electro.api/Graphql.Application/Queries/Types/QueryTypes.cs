using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Graphql.Application.Queries.Types
{
    public static class QueryTypes
    {
        public static IRequestExecutorBuilder AddQueriesTypes(this IRequestExecutorBuilder builder)
        {
            builder
                .AddType<RecipientType>()
                .AddType<OpinionType>()
                .AddType<ProductType>();

            return builder;
        }
    }
}
