using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Opinions.GetOpinion
{
    public class GetOpinionHandler : IRequestHandler<GetOpinionQuery, GetOpinionResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;
        private readonly ILogger<GetOpinionHandler> _logger;

        public GetOpinionHandler(IUnitOfWork unitOfWork, IUserContext userContext, ILogger<GetOpinionHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
            _logger = logger;
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
                _logger.LogError(ex, "An error occurred while getting opinion");
                throw new BadRequestException(ex.Message);
            }
        }
    }
}