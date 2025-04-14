using Graphql.Application.Queries;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Graphql.Application
{
    public static class GraphqlApplicationServices
    {
        public static IRequestExecutorBuilder AddGraphqlApplicationServices(this IRequestExecutorBuilder builder)
        {
            builder.AddQueryType<Query>();
            return builder;
        }
    }
}
