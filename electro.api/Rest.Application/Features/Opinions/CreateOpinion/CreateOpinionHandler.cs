using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OpinionService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Opinions.CreateOpinion
{
    public class CreateOpinionHandler : IRequestHandler<CreateOpinionCommand, CreateOpinionResult>
    {
        private readonly IOpinionService _opinionService;
        private readonly IUserContext _userContext;

        public CreateOpinionHandler(IOpinionService opinionService, IUserContext userContext)
        {
            _opinionService = opinionService;
            _userContext = userContext;
        }

        public async Task<CreateOpinionResult> Handle(CreateOpinionCommand command, CancellationToken cancellationToken)
        {
            if (!_userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to add an opinion.");
            }

            try
            {
                var opinionModel = new OpinionModel
                {
                    ProductId = command.ProductId,
                    Content = command.Content,
                    Rating = command.Rating,
                    AuthorDisplayName = command.AuthorDisplayName
                };

                var opinion = await _opinionService.CreateOpinionAsync(_userContext.UserId, opinionModel, cancellationToken);

                return CreateOpinionMapper.MapToCreateOpinionResult(opinion);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create opinion", ex);
            }
        }
    }
}
