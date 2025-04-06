using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Opinions.CreateOpinion
{
    public class CreateOpinionHandler : IRequestHandler<CreateOpinionCommand, CreateOpinionResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;
        private readonly ILogger<CreateOpinionHandler> _logger;

        public CreateOpinionHandler(IUnitOfWork unitOfWork, IUserContext userContext, ILogger<CreateOpinionHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
            _logger = logger;
        }

        public async Task<CreateOpinionResult> Handle(CreateOpinionCommand command, CancellationToken cancellationToken)
        {
            if (!_userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to add an opinion.");
            }

            var product = await _unitOfWork.ProductRepository.GetByIdAsync(command.ProductId, cancellationToken);
            if (product == null)
            {
                throw new NotFoundException($"Product with Id '{command.ProductId}' was not found.");
            }

            try
            {
                var opinion = product.AddOpinion(
                    _userContext.UserId,
                    command.Content.Trim(),
                    command.Rating,
                    command.AuthorDisplayName
                );

                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return CreateOpinionMapper.MapToCreateOpinionResult(opinion);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating opinion");
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
