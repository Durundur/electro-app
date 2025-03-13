using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Opinions.GetOpinion
{
    public class GetOpinionHandler : IRequestHandler<GetOpinionQuery, GetOpinionResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public GetOpinionHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<GetOpinionResult> Handle(GetOpinionQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var opinion = await _unitOfWork.OpinionRepository.GetByIdAsync(request.Id, cancellationToken);

                if (opinion == null)
                {
                    throw new NotFoundException($"Opinion with Id '{request.Id}' was not found.");
                }

                Guid? userId = _userContext.IsAuthenticated ? _userContext.UserId : null;
                return GetOpinionMapper.MapToGetOpinionResult(opinion, userId);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new BadRequestException(ex.Message);
            }
        }
    }
}