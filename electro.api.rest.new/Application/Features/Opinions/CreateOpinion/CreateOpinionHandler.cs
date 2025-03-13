using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Opinions.CreateOpinion
{
    public class CreateOpinionHandler : IRequestHandler<CreateOpinionCommand, CreateOpinionResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public CreateOpinionHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
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
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
