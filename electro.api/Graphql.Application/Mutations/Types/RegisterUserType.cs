using Application.Services.Models;
using HotChocolate;
using HotChocolate.Types;

namespace Graphql.Application.Mutations.Types
{
    public class RegisterUserType : ObjectType<RegisterUserResult>
    {
        protected override void Configure(IObjectTypeDescriptor<RegisterUserResult> descriptor)
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
            public Guid? GetUserId([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.UserId;

            public string? GetToken([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.Token;

            public DateTime? GetTokenExpiry([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.TokenExpiry;

            public string? GetRefreshToken([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.RefreshToken;

            public DateTime? GetRefreshTokenExpiry([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.RefreshTokenExpiry;

            public IList<string>? GetRoles([Parent] RegisterUserResult result) => (result as RegisterUserSuccessResult)?.Roles;
        }
    }
}
