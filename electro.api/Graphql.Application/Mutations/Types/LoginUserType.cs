using Application.Services.Models;
using HotChocolate;
using HotChocolate.Types;

namespace Graphql.Application.Mutations.Types
{
    public class LoginUserType : ObjectType<LoginUserResult>
    {
        protected override void Configure(IObjectTypeDescriptor<LoginUserResult> descriptor)
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
            public Guid? GetUserId([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.UserId;

            public string? GetToken([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.Token;

            public DateTime? GetTokenExpiry([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.TokenExpiry;

            public string? GetRefreshToken([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.RefreshToken;

            public DateTime? GetRefreshTokenExpiry([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.RefreshTokenExpiry;

            public IList<string>? GetRoles([Parent] LoginUserResult result) => (result as LoginUserSuccessResult)?.Roles;
        }
    }
}
