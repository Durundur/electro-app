using Domain.Aggregates.UserAggregate;
using HotChocolate.Types;

namespace Graphql.Application.Queries.Types
{
    public class RecipientType : ObjectType<Recipient>
    {
        protected override void Configure(IObjectTypeDescriptor<Recipient> descriptor)
        {
            descriptor.Name("UserRecipient");
        }
    }
}
