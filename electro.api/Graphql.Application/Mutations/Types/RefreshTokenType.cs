using Application.Services.Models;
using HotChocolate;
using HotChocolate.Types;

namespace Graphql.Application.Mutations.Types
{
    public class RefreshTokenType : ObjectType<RefreshTokenResult>
    {
        protected override void Configure(IObjectTypeDescriptor<RefreshTokenResult> descriptor)
        {
            descriptor.Field("userId")
                 .ResolveWith<Resolvers>(r => r.GetUserId(default!));

            descriptor.Field("token")
                .ResolveWith<Resolvers>(r => r.GetToken(default!));

            descriptor.Field("tokenExpiry")
                .ResolveWith<Resolvers>(r => r.GetTokenExpiry(default!));

            descriptor.Field("refreshToken")
                .ResolveWith<Resolvers>(r => r.GetRefreshToken(default!));

            descriptor.Field("refreshTokenExpiry")
                .ResolveWith<Resolvers>(r => r.GetRefreshTokenExpiry(default!));

            descriptor.Field("roles")
                .ResolveWith<Resolvers>(r => r.GetRoles(default!));
        }

        private class Resolvers
        {
            public Guid? GetUserId([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.UserId;

            public string? GetToken([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.Token;

            public DateTime? GetTokenExpiry([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.TokenExpiry;

            public string? GetRefreshToken([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.RefreshToken;

            public DateTime? GetRefreshTokenExpiry([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.RefreshTokenExpiry;

            public IList<string>? GetRoles([Parent] RefreshTokenResult result) => (result as RefreshTokenSuccessResult)?.Roles;
        }
    }
}
