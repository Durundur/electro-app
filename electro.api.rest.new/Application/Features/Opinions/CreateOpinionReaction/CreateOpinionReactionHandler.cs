using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Opinions.CreateOpinionReaction
{
    public class CreateOpinionReactionHandler : IRequestHandler<CreateOpinionReactionCommand, CreateOpinionReactionResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public CreateOpinionReactionHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<CreateOpinionReactionResult> Handle(CreateOpinionReactionCommand command, CancellationToken cancellationToken)
        {
            if (!_userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to react to opinions.");
            }

            var opinion = await _unitOfWork.OpinionRepository.GetByIdAsync(command.OpinionId, cancellationToken);
            if (opinion == null)
            {
                throw new NotFoundException($"Opinion with Id '{command.OpinionId}' was not found.");
            }

            try
            {
                opinion.AddReaction(_userContext.UserId, command.ReactionType);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return new CreateOpinionReactionResult
                {
                    ReactionType = command.ReactionType,
                    LikesCount = opinion.GetLikesCount(),
                    DislikesCount = opinion.GetDislikesCount()
                };
            }
            catch (Exception ex)
            {
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
