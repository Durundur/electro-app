using Application.Exceptions;
using Application.Services.OpinionService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Opinions.CreateOpinionReaction
{
    public class CreateOpinionReactionHandler : IRequestHandler<CreateOpinionReactionCommand, CreateOpinionReactionResult>
    {
        private readonly IOpinionService _opinionService;
        private readonly IUserContext _userContext;

        public CreateOpinionReactionHandler(IOpinionService opinionService, IUserContext userContext)
        {
            _opinionService = opinionService;
            _userContext = userContext;
        }

        public async Task<CreateOpinionReactionResult> Handle(CreateOpinionReactionCommand command, CancellationToken cancellationToken)
        {
            if (!_userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to react to opinions.");
            }
            try
            {
                var opinion = await _opinionService.CreateOpinionReactionAsync(_userContext.UserId, command.OpinionId, command.ReactionType, cancellationToken); 

                return CreateOpinionReactionMapper.MapToCreateOpinionReactionResult(opinion, command.ReactionType);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create opinion reaction", ex);
            }
        }
    }
}
