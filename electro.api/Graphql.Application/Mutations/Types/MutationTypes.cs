using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Graphql.Application.Mutations.Types
{
    public static class MutationTypes
    {
        public static IRequestExecutorBuilder AddMutationTypes(this IRequestExecutorBuilder builder)
        {
            builder.AddType<LoginUserType>()
               .AddType<RegisterUserType>()
               .AddType<RefreshTokenType>();

            return builder;
        }
    }
}
