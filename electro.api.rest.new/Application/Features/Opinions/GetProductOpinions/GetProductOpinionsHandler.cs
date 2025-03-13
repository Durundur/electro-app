using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsHandler : IRequestHandler<GetProductOpinionsQuery, GetProductOpinionsResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public GetProductOpinionsHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
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
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
