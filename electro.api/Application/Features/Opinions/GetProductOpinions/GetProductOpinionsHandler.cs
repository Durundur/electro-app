using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsHandler : IRequestHandler<GetProductOpinionsQuery, GetProductOpinionsResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;
        private readonly ILogger<GetProductOpinionsHandler> _logger;

        public GetProductOpinionsHandler(IUnitOfWork unitOfWork, IUserContext userContext, ILogger<GetProductOpinionsHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
            _logger = logger;
        }

        public async Task<GetProductOpinionsResult> Handle(GetProductOpinionsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _unitOfWork.OpinionRepository.GetProductOpinionsQuery(request.ProductId);

                if (request.Rating.HasValue)
                {
                    query = query.Where(o => (int)Math.Ceiling(o.Rating) == request.Rating.Value);
                }

                var totalCount = await query.CountAsync(cancellationToken);

                query = query
                    .OrderByDescending(o => o.CreatedAt)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize);

                var opinions = await query.ToListAsync(cancellationToken);

                Guid? userId = _userContext.IsAuthenticated ? _userContext.UserId : null;

                return new GetProductOpinionsResult(
                    GetProductOpinionsMapper.MapToGetGetProductOpinionsResultOpinion(opinions, userId).ToList(),
                    totalCount,
                    request.Page,
                    request.PageSize
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting product opinions");
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
