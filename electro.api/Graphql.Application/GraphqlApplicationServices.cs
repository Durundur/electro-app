using Graphql.Application.Mutations;
using Graphql.Application.Mutations.Types;
using Graphql.Application.Queries;
using Graphql.Application.Queries.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Graphql.Application
{
    public static class GraphqlApplicationServices
    {
        public static IServiceCollection AddGraphqlApplicationServices(this IServiceCollection services)
        {
            services
                .AddGraphQL()
                .AddAuthorization()
                .AddQueryType<QueryType>()
                .AddMutationType<MutationType>()
                .AddMutationTypes()
                .AddQueriesTypes();


            return services;
        }
    }
}
