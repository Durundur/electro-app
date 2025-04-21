using Application.Services.UserContext;
using Domain.Aggregates.ProductCatalogAggregate;
using HotChocolate.Types;

namespace Graphql.Application.Queries.Types
{
    public class OpinionType : ObjectType<Opinion>
    {
        protected override void Configure(IObjectTypeDescriptor<Opinion> descriptor)
        {
            descriptor
                .Field("userReaction")
                .Type<EnumType<OpinionReactionType>>()
                .Resolve(context =>
                {
                    
                    var opinion = context.Parent<Opinion>();
                    var userContext = context.Service<IUserContext>();

                    if (!userContext.IsAuthenticated)
                        return null;

                    return opinion.GetUserReaction(userContext.UserId);
                });
        }
    }
}
